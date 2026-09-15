# Eber Group — Month-End Reconciliation Memory

**Purpose:** everything needed to close Coconut Creek and Miami Beach without rediscovering it.
Read this BEFORE searching Drive, Gmail or QBO. Last verified 15 Sep 2026.

---

## 1. Entities

| Name in books | Centre | Group |
|---|---|---|
| 3T Radiology and Research Nuclear Medicine / 3T Radiology LLC | Coconut Creek | **Eber** |
| Pro Echo Inc (dba Pro-Echo Diagnostics) | Miami Beach | **Eber** |
| QMG / Insite Radiology | Aventura, South Miami, Pines | Insite (separate) |

**Eber Group = Coconut Creek + Miami Beach only.** Client contacts: Daryl Eber, Humberto Carrion, Isaac Zwick (COO). Internal: Danika (AP/close), Donne (AP intake).

---

## 2. The rule

> Reverse the prior month's accrual, then accrue the difference between the procedures actually
> performed and what the supplier has already billed.

Cumulative by construction — any dose still unbilled from an earlier month stays in until its invoice
lands. Corrected to this basis at July 2026 close; May and June were restated.

**Journal** — dated month-end, reversing on the 1st:

```
Dr  COGS — Medical Supplies · PET Tracer      X
    Cr  Accrued Liabilities · Tracer              X
```

Below the net revenue line. **Never** against Scan Supplies contra-revenue — that shrinks the
billing-fee base.

---

## 3. Where everything lives

### Activity (doses performed)

| What | Where |
|---|---|
| PET Assembly Line — **JSON, use this** | Drive `1JNKmnYO7Y7OG49HEYowM-zUo7gcrOCY5` |
| Same data as HTML dashboard | Drive `1KEGA4K--FyBhWaYnTwVCbmgOqfEPJDD5` |
| Live site (Clerk login — not reachable headless) | pet.benefique.com |
| Parent folder | Drive `1M7mlbdI1m0YAtMetz5AigDkJpD5UyE-E` |

Both mirrors refresh ~07:00 and ~11:00 daily. Records carry `fac`, `drug`, `cost`, `date`, `month`,
`encounterId`.

### Invoiced (what the supplier has billed)

| What | Where |
|---|---|
| **AP Register — Beach and Creek** — carries **live QBO aged payables per entity**, refreshed daily | Drive Sheet `1OmJswx-AXzQFpeWqscTnPGX0qK7pYvFIq5VKuSHWsAE` |
| AP invoice PDF intake (every supplier invoice, auto-filed) | Drive folder `1IcoVPgd-30-Wv4d3s8HDEC6F1hdS1dYq` |

**Start with the AP Register.** It is the fastest route to the invoiced side and needs no QBO login.

### Exa (RIS extracts)

| What | Where | Note |
|---|---|---|
| Insite Exa 2026 | Drive `1Ngq7grtyB0PL7pAu3U6i0r-xQylrfObQ` | **ends 18 Aug 2026** — cannot close a month alone |
| Insite Exa 2025 | Drive `1G3sDlhnr7t6A2D0vKuZXEweSa1mWLabA` | |
| Insite Exa 2024 | Drive `1K-9yA-1Q2cvkNjmbG912_8ROqT5C_L3b` | |
| Insite/Exa folder | Drive `1HXkA16FqwByIKWh1CTtVTKsfRchhQI0H` | |
| Longhorn Exa | Drive `1oqCTIEQyPpPiO5XivjJYisCmzOyRfKyM` | **Longhorn Imaging, Texas — NOT Eber.** Do not use. |

---

## 4. Vendor map — five vendors, three price a drug

| Vendor | Bills | Per dose | Invoice series |
|---|---|---|---|
| **GE Healthcare** (Medi-Physics) | Vizamyl, Amyvid — the drug | $2,800 / $3,038 | inv `0101······`, credit `0150·····` |
| **Progenics Pharmaceuticals** | Pylarify — the drug | $5,701.59 | |
| **Life Molecular Imaging** | Neuraceq — the drug | $2,940 | |
| **PETNET Solutions** | Radiopharmacy, weekly | — | `53·····`, customer **43184** |
| **Cardinal Health 414** | FDG + delivery; **the dose register** | $114.67 FDG | `80043·····` |

Illuccix $5,166. **Bracco** = contrast, not tracer. **PETNET Solutions and Cardinal Health are
different vendors** — both carry nuclear-pharmacy balances; do not merge them.

### Ship-to codes

| Centre | GE | Cardinal |
|---|---|---|
| Coconut Creek | 244650 | 2100058763 |
| Miami Beach | 244653 | 2100057195 |
| Aventura | 244654 | |

### The two fields that make this work

1. **GE invoices carry `Calibration date & time` per line — that is the dose date.** Match on it.
   GE bills weekly, dated Friday, covering that week.
2. **Cardinal lists flutemetamol at $0.00** — worthless for cost, but the itemised list is a complete
   dose register with Rx number, date and patient. Count from Cardinal, price from GE.

---

## 5. Procedure

1. Reverse prior month's accrual (dated the 1st). Confirm it actually reversed.
2. Pull activity for the month from the PET Assembly Line JSON, by centre and drug. Drug-bearing only.
3. Open the **AP Register** sheet — read aged payables per entity per vendor.
4. Build the dose register from Cardinal's itemised lists for the month.
5. Match GE calibration dates (and Progenics / Life Molecular invoices) against that register.
   Unmatched doses = un-invoiced.
6. Price at standard dose cost. **Cross-check: every vendor balance should divide into whole doses at
   standard cost.** If it doesn't, something is mispriced or misposted.
7. Net off credit notes (GE `0150` series — cancelled patients, arrive weeks late).
8. Book the journal. Record dose count and invoice numbers in the memo.

Run it **after the first Friday of the new month** so GE's straggler invoice has landed.

---

## 6. Traps

- **Cancelled patients.** GE invoices doses never administered, credits them weeks later. Doses
  shipped ≠ procedures performed. Happened at Creek in Aug 2026 (three doses dated 1 Aug, credited
  on 11 Sep) and with Neuraceq earlier in the year.
- **Cleerly and HeartFlow are not tracer.** AI read services, appear at $0 in the Assembly Line.
- **Unpriced rows.** Occasional dose with no cost (Aug 2026 had one Creek row logged only "PSMA").
- **Duplicate AP intake.** Same invoice arrives from supplier *and* forwarded by the centre.
  Deduplicate on invoice number, not filename.
- **GE invoices also arrive via the GE portal, not only email.** Never conclude an invoice is missing
  from the AP mailbox alone — check the aged payable first.

---

## 7. Anchors

Prior-month dose counts, accrual amounts and vendor balances are **not stored in this repo** — this
is the public website repo and client financial data does not belong in it.

They are in the Drive twin, section 7: `_EBER_MONTH_END_MEMORY.md`
(Drive `1x4hQB9djJZcJXfPCroFdAhRN8h4KRgfV`). Read it before starting a close, and check any new
figure against the May, July and August anchors recorded there.

---

## 8. Dead ends — do not repeat

| Route | Status |
|---|---|
| Intuit QuickBooks MCP connector | Tools load but **token expired**; OAuth cannot run in a cloud session. Use the AP Register sheet instead. |
| cfo.benefique.com `/api/query` | NextAuth login wall. Vercel deployment protection is **disabled**, so `web_fetch_vercel_url` / `get_access_to_vercel_url` give nothing. `/api/health` is open and shows last refresh. |
| pet.benefique.com | Clerk auth (`x-clerk-auth-status: signed-out`). Use the Drive JSON mirror. |
| Longhorn Exa export | Texas facilities only. No Eber data, no tracer CPT codes. |
| `git clone` of finance repos | May trip the credential-exploration classifier. Use the GitHub MCP file-read tools. |

Vercel project: `benefique-portfolio-dashboard` = `prj_EJcimzLv4bjOLqJqy8Htz2q4pqrS`
(team `team_gcSQeOxe75jyhFJv5xbEGs6W`). Repo `gerrit-design/cfo-eber-group` is a Vite front-end, not the API.

---

## 9. Open items

Carried in the Drive twin, section 9 — kept there because they cite balances. Summary of the shape
(no figures): August Creek needs a dose-by-dose reconciliation of the GE payable against the portal
invoice population rather than the AP mailbox; Pylarify, Neuraceq and Illuccix are not yet traced
dose-by-dose; Life Molecular appears in neither entity's aged payables and needs explaining; Beach's
31 July accrual balance was never confirmed. There is also an open supplier-float question on the GE
payable for Daryl and Humberto, separate from the close.
