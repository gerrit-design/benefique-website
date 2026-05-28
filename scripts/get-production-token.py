#!/usr/bin/env python3
"""
One-time setup: capture a Google OAuth refresh token with calendar.events
write scope, formatted for Vercel env vars.

The token from update-booking-slots.py only has calendar.readonly scope.
The /api/book-slot Vercel function needs to CREATE events, so it needs
calendar.events scope. Same OAuth client, different scope = new consent
flow + new refresh token.

Usage:
    python scripts/get-production-token.py

Prints three env-var assignments. Paste them into Vercel:
    Project Settings -> Environment Variables (Production + Preview + Dev)

After saving, redeploy (or just push any commit) so the function picks
them up.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

try:
    from google_auth_oauthlib.flow import InstalledAppFlow
except ImportError:
    print(
        "ERROR: pip install google-auth-oauthlib google-auth google-api-python-client",
        file=sys.stderr,
    )
    sys.exit(1)

CRED_DIR = Path.home() / ".benefique"
CREDENTIALS_FILE = CRED_DIR / "google-calendar-credentials.json"
WRITE_SCOPES = ["https://www.googleapis.com/auth/calendar.events"]


def main() -> int:
    if not CREDENTIALS_FILE.exists():
        print(f"ERROR: missing OAuth client JSON at {CREDENTIALS_FILE}", file=sys.stderr)
        return 1

    flow = InstalledAppFlow.from_client_secrets_file(str(CREDENTIALS_FILE), WRITE_SCOPES)
    # prompt='consent' + access_type='offline' forces Google to issue a fresh
    # refresh_token bound to the requested scopes (not the old grant's scopes).
    creds = flow.run_local_server(port=0, prompt='consent', access_type='offline')

    if not creds.refresh_token:
        print(
            "ERROR: no refresh_token returned. Revoke prior consent and re-run.\n"
            "  https://myaccount.google.com/permissions",
            file=sys.stderr,
        )
        return 2

    with open(CREDENTIALS_FILE, "r", encoding="utf-8") as f:
        client_data = json.load(f)
    installed = client_data.get("installed") or client_data.get("web") or {}
    client_id = installed.get("client_id", "")
    client_secret = installed.get("client_secret", "")

    print()
    print("=" * 70)
    print("Add these to Vercel env vars (Production + Preview + Development):")
    print("=" * 70)
    print()
    print(f"GOOGLE_CLIENT_ID={client_id}")
    print(f"GOOGLE_CLIENT_SECRET={client_secret}")
    print(f"GOOGLE_REFRESH_TOKEN={creds.refresh_token}")
    print()
    print("=" * 70)
    print("CLI version (if you prefer):")
    print("=" * 70)
    print()
    print(f"vercel env add GOOGLE_CLIENT_ID production")
    print(f"vercel env add GOOGLE_CLIENT_SECRET production")
    print(f"vercel env add GOOGLE_REFRESH_TOKEN production")
    print()
    print("After saving, redeploy. /api/book-slot will start booking events.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
