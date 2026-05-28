#!/usr/bin/env python3
"""
Refresh available booking slots on benefique.com/thank-you page.

Pulls Gerrit's Google Calendar availability for the next N business days
(default 2) in an 11:00 AM - 2:00 PM ET window, computes truly-open
30-minute slots (no conflicts), and writes src/booking-slots.json.

Run weekly (Sunday 6 PM is a good default) to keep the booking page fresh.
The React app reads booking-slots.json at build time, so changes ship via
a normal Vercel deploy.

Usage:
    python scripts/update-booking-slots.py
    python scripts/update-booking-slots.py --days 3
    python scripts/update-booking-slots.py --window-start 10 --window-end 15
    python scripts/update-booking-slots.py --auto-deploy

Requires (one-time):
    pip install google-api-python-client google-auth-oauthlib google-auth

First-run setup:
    1. Google Cloud Console -> APIs & Services -> Credentials
    2. Create OAuth client ID, type "Desktop app"
    3. Download the JSON, save to:
        ~/.benefique/google-calendar-credentials.json
       (on Windows: %USERPROFILE%\\.benefique\\google-calendar-credentials.json)
    4. Run the script; a browser will open for one-time consent.
       Subsequent runs use the cached refresh token.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from datetime import date, datetime, time, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

try:
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build
except ImportError:
    print(
        "ERROR: missing Google API deps. Install with:\n"
        "  pip install google-api-python-client google-auth-oauthlib google-auth",
        file=sys.stderr,
    )
    sys.exit(1)

SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]
TZ = ZoneInfo("America/New_York")

REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_FILE = REPO_ROOT / "src" / "booking-slots.json"

CRED_DIR = Path.home() / ".benefique"
TOKEN_FILE = CRED_DIR / "google-calendar-token.json"
CREDENTIALS_FILE = CRED_DIR / "google-calendar-credentials.json"

DEFAULT_SLOT_MIN = 30


def get_calendar_service():
    """Return an authenticated Calendar API client.

    Caches the refresh token at TOKEN_FILE; only the first run opens a browser.
    """
    CRED_DIR.mkdir(parents=True, exist_ok=True)
    creds = None
    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not CREDENTIALS_FILE.exists():
                print(
                    f"ERROR: missing OAuth client JSON at {CREDENTIALS_FILE}\n"
                    "See header of this script for setup steps.",
                    file=sys.stderr,
                )
                sys.exit(1)
            flow = InstalledAppFlow.from_client_secrets_file(str(CREDENTIALS_FILE), SCOPES)
            creds = flow.run_local_server(port=0)
        TOKEN_FILE.write_text(creds.to_json(), encoding="utf-8")
    return build("calendar", "v3", credentials=creds)


def next_business_days(n: int) -> list[date]:
    """Next N weekdays after today, in date order."""
    out: list[date] = []
    cursor = datetime.now(TZ).date() + timedelta(days=1)
    while len(out) < n:
        if cursor.weekday() < 5:
            out.append(cursor)
        cursor += timedelta(days=1)
    return out


def fetch_busy(service, day: date, start_hour: int, end_hour: int) -> list[tuple[datetime, datetime]]:
    """Return (start, end) tuples of confirmed events overlapping the day's slot window."""
    window_start = datetime.combine(day, time(start_hour, 0), tzinfo=TZ)
    window_end = datetime.combine(day, time(end_hour, 0), tzinfo=TZ)
    resp = (
        service.events()
        .list(
            calendarId="primary",
            timeMin=window_start.isoformat(),
            timeMax=window_end.isoformat(),
            singleEvents=True,
            orderBy="startTime",
        )
        .execute()
    )
    busy: list[tuple[datetime, datetime]] = []
    for ev in resp.get("items", []):
        # Skip cancelled, transparent (free), and all-day events
        if ev.get("status") == "cancelled":
            continue
        if ev.get("transparency") == "transparent":
            continue
        s = ev.get("start", {})
        e = ev.get("end", {})
        if "dateTime" not in s or "dateTime" not in e:
            continue
        busy.append(
            (
                datetime.fromisoformat(s["dateTime"]).astimezone(TZ),
                datetime.fromisoformat(e["dateTime"]).astimezone(TZ),
            )
        )
    return busy


def format_date_label(d: date) -> str:
    return f"{d.strftime('%A, %B')} {d.day}"


def format_time_label(dt: datetime) -> str:
    return dt.strftime("%I:%M %p ET").lstrip("0")


def open_slots_for_day(
    day: date,
    busy: list[tuple[datetime, datetime]],
    start_hour: int,
    end_hour: int,
    slot_min: int,
) -> list[dict]:
    out: list[dict] = []
    cursor = datetime.combine(day, time(start_hour, 0), tzinfo=TZ)
    boundary = datetime.combine(day, time(end_hour, 0), tzinfo=TZ)
    delta = timedelta(minutes=slot_min)
    while cursor + delta <= boundary:
        slot_end = cursor + delta
        conflict = any(s < slot_end and e > cursor for (s, e) in busy)
        if not conflict:
            out.append(
                {
                    "date": format_date_label(day),
                    "day": day.strftime("%a").lower(),
                    "iso": cursor.isoformat(),
                    "display": format_time_label(cursor),
                }
            )
        cursor = slot_end
    return out


def write_json_if_changed(payload: dict) -> bool:
    new_content = json.dumps(payload, indent=2) + "\n"
    if OUTPUT_FILE.exists() and OUTPUT_FILE.read_text(encoding="utf-8") == new_content:
        return False
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(new_content, encoding="utf-8")
    return True


def auto_deploy(slot_count: int) -> None:
    os.chdir(REPO_ROOT)
    subprocess.run(["git", "add", str(OUTPUT_FILE.relative_to(REPO_ROOT))], check=True)
    staged = subprocess.run(["git", "diff", "--cached", "--quiet"]).returncode
    if staged == 0:
        print("Nothing staged after git add — skipping commit.")
        return
    date_str = datetime.now(TZ).strftime("%Y-%m-%d")
    msg = f"Refresh booking slots ({date_str}, {slot_count} open)"
    subprocess.run(["git", "commit", "-m", msg], check=True)
    subprocess.run(["git", "push", "origin", "main"], check=True)
    print("Pushed; Vercel will redeploy in ~2 min.")


def main() -> int:
    p = argparse.ArgumentParser(description="Refresh /thank-you booking slots from Google Calendar.")
    p.add_argument("--days", type=int, default=2, help="Number of business days to offer (default 2).")
    p.add_argument("--window-start", type=int, default=11, help="Slot window start hour ET (default 11 = 11am).")
    p.add_argument("--window-end", type=int, default=14, help="Slot window end hour ET (default 14 = 2pm).")
    p.add_argument("--slot-min", type=int, default=DEFAULT_SLOT_MIN, help="Slot duration in minutes (default 30).")
    p.add_argument("--auto-deploy", action="store_true", help="git commit + push if slots changed.")
    args = p.parse_args()

    if args.window_end <= args.window_start:
        print("ERROR: --window-end must be greater than --window-start.", file=sys.stderr)
        return 2

    service = get_calendar_service()
    days = next_business_days(args.days)

    all_slots: list[dict] = []
    print(f"Computing slots {args.window_start:02d}:00 - {args.window_end:02d}:00 ET, {args.slot_min}-min:")
    for day in days:
        busy = fetch_busy(service, day, args.window_start, args.window_end)
        open_for_day = open_slots_for_day(day, busy, args.window_start, args.window_end, args.slot_min)
        all_slots.extend(open_for_day)
        print(f"  {day.strftime('%a %b %d')}: {len(open_for_day)} open, {len(busy)} conflict(s)")

    if not all_slots:
        print("WARNING: zero open slots. Page will show fallback copy. Not deploying.")

    payload = {
        "generated_at": datetime.now(TZ).isoformat(),
        "window_start_hour": args.window_start,
        "window_end_hour": args.window_end,
        "slot_minutes": args.slot_min,
        "slots": all_slots,
    }

    changed = write_json_if_changed(payload)
    if not changed:
        print(f"No change ({len(all_slots)} total slots).")
        return 0

    print(f"Wrote {len(all_slots)} slots to {OUTPUT_FILE.relative_to(REPO_ROOT)}")
    if args.auto_deploy and all_slots:
        auto_deploy(len(all_slots))
    elif args.auto_deploy:
        print("Skipped auto-deploy because zero open slots.")
    else:
        print("Run with --auto-deploy to commit + push.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
