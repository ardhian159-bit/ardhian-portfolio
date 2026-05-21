# GitHub Projects — Ardhian Caesar Hermawan
GitHub: https://github.com/ardhian159-bit

---

## 1. Sales Funnel Management System (funnel-intan-pariwara)
**Repo:** https://github.com/ardhian159-bit/funnel-intan-pariwara
**Stack:** HTML · JavaScript · CSS · Google Apps Script (Code.gs)
**Context:** PT Intan Pariwara · 2026
**Status:** Production — 57 commits, actively maintained

### What it is
The original prototype of the internal CRM built for PT Intan Pariwara's national sales team.
Multi-page HTML app with Google Sheets as backend via Apps Script.

### Pages / Modules
- `index.html` — main entry
- `dashboard.html` — sales pipeline overview
- `monitoring.html` — real-time monitoring
- `sales.html` — sales data entry
- `admin.html` — admin panel
- `controlpanel.html` — control settings
- `navbar.html` — shared navigation component
- `Code.gs` — Google Apps Script backend

### Role in portfolio
Shows the evolution from prototype (this repo) to full-stack Next.js + Supabase production system (NSMS).
Demonstrates ability to ship fast with constrained tools, then scale properly.

---

## 2. SIRUP Scraper Pipeline (sirup-scraper)
**Repo:** https://github.com/ardhian159-bit/sirup-scraper
**Stack:** Python 100%
**Context:** PT Intan Pariwara · 2025–2026
**Status:** Published — 1 commit (initial release)

### What it is
Automated data pipeline for scraping government procurement data (SIRUP — Sistem Informasi Rencana Umum Pengadaan) across all 514 kabupaten/kota in Indonesia.

### Files
- `Scrapper Sirup.py` — main scraper with session auth + pagination
- `rekap_sirup.py` — data aggregation and summary pipeline
- `SIRUP_README.md` — documentation
- `.ipynb_checkpoints/` — Jupyter notebook checkpoints

### Key capabilities
- Cookie-based session authentication
- Anti-fail resume/checkpoint logic (can restart from last position)
- Pagination handling across all 514 districts
- Excel export for business use
- Used for national-scale lead scoring and market sizing at Intan Pariwara

---

## 3. NSMS — National Sales Management System (NSMS)
**Repo:** https://github.com/ardhian159-bit/NSMS
**Live:** https://nsms-three.vercel.app
**Stack:** TypeScript 75.7% · HTML 23.1% · CSS · JavaScript
**Context:** PT Piwulang Pradnya Luhur (Intan Pariwara) · NSM KLDI Division · 2026
**Status:** Active production — 38 commits, deployed on Vercel

### What it is
Full-stack production CRM rebuilt from the funnel-intan-pariwara HTML prototype.
National Sales Management System for PT Intan Pariwara's KLDI division.
Multi-role pipeline tracking system with real-time Supabase backend.
Currently the primary management monitoring tool used by the national sales team.

### Tech stack
Next.js 14 App Router · TypeScript strict · Tailwind CSS · shadcn/ui ·
DM Sans font · Supabase (PostgreSQL + Auth + RLS) · Recharts · Lucide Icons · Vercel

### Supabase schema (production, already live)
Tables: `leads`, `profiles`, `tracker`, `settings`, `targets`

`leads` — core pipeline data
- Fields: funnel_id (UNIQUE), nama_paket, instansi, provinsi, kab_kota, wilayah,
  principal, sumber_dana, nilai_anggaran, dpp, forecast_netto, ppn, perkiraan_cb,
  produk, qty, jenis_produk, status, tk (0/5/10/25/50/75/100),
  owner_name, owner_id, sp_id, mp_id, input_week_label, target_close_week,
  target_close_quarter, is_tayang, is_shadow, parent_lead_id, keterangan

`tracker` — weekly status history with UNIQUE(funnel_id, week) constraint
`profiles` — role-based users (superadmin/admin/sales/guest/mp/sp/am/dirut)
`settings` — master data (picNames, principals, sumberDana, jenisProduk, quarterDistribution)
`targets` — annual targets per profile

### Business logic implemented
- TK Status Map: 0=Gagal, 5=Info Awal, 10=Info Kebutuhan, 25=Presentasi,
  50=Peluang 50:50, 75=Hot Prospek, 100=Closing
- DPP calculation: `ppn === 'PPN' ? round(nilaiAnggaran / 1.11) : nilaiAnggaran`
- Forecast Netto: `round(dpp * (1 - perkiraanCb / 100))`
- Funnel ID generation with prefix logic + collision handling
- Tracker upsert: same funnel_id + week overwrites

### Roles
superadmin (full) · admin (dashboard + monitoring + admin panel) ·
sales (pipeline input + update only) · guest (read-only dashboard) ·
mp/sp/am/dirut (branch/team/personal views)

### App structure
```
app/
├── (app)/layout.tsx       ← auth guard + Sidebar + BottomNav
├── (app)/dashboard/       ← server + client components
├── (app)/pipeline/        ← sales input + update + new lead
├── (app)/admin/
├── (app)/monitoring/
├── (app)/control/
└── login/
components/
├── layout/Sidebar.tsx     ← desktop, 220px fixed
├── layout/BottomNav.tsx   ← mobile, fixed bottom with FAB
└── dashboard/
    ├── KpiCards, FilterBar, PipelineTable, LeadDetailDrawer
    └── charts/ (ChartFunnel, ChartQuarter, ChartTopPic, ChartSumberDana, ChartPrincipal)
lib/
├── supabase.ts + supabase-server.ts
└── dashboard/ (formatters, filters, charts, table, detail, week)
```

### Design tokens (from AGENTS.md)
```
Background:   #ffffff (cards), #F5F5F2 (page bg)
Border:       #EBEBЕ7 (0.5px)
Text primary: #1A1A18
Text muted:   #6B6B65
Accent:       #1A1A18 (buttons, FAB)
Font:         DM Sans (body), DM Mono (numbers)
Radius:       8px (cards), 100px (pills/badges)
```

### Navigation pattern
- Desktop: left sidebar 220px fixed
- Mobile: bottom navbar with center FAB (`bg-[#1A1A18] rounded-xl`)

### Legacy files still in repo
`dashboard.html` — original prototype reference (1,447 lines)
Other legacy files in `funnel-intan-pariwara` repo: sales.html (2,092), admin.html (2,820),
monitoring.html (2,194), controlpanel.html (2,119)

---

## 4. Warehouse Fulfillment Dashboard (warehouse-fulfillment-dashboard)
**Repo:** https://github.com/ardhian159-bit/warehouse-fulfillment-dashboard
**Live:** https://warehouse-fulfillment-dashboard.vercel.app/dashboard
**Stack:** TypeScript 79.5% · Python 18.4% · CSS · JavaScript
**Context:** Portfolio showcase — PT Wikrama Dharma Tunggadewa, Jombang, Jawa Timur
**Status:** Prototype complete — 6 commits, deployed on Vercel

### What it is
Hybrid warehouse fulfillment management dashboard prototype.
Demonstrates complex business logic implementation (dead stock fees, tiering, auto-billing)
and full-stack frontend architecture using modern Next.js stack.

### Business context
The warehouse runs two models simultaneously (Hybrid):
- Sewa Space (passive): Rp 38,000/m²/month → est. Rp 27M/month at full capacity
- Jasa Fulfillment (active): activity-based billing → est. Rp 313M/month at full capacity
- Hybrid 50:50 → est. Rp 169M/month (chosen model)

### Modules implemented
- Dashboard — daily stats, revenue comparison, stock alerts, live transactions
- KPI Panel — 6 KPIs: profit/m², utilization rate, turnover, dead stock ratio, retention, revenue mix
- Client Management — filter by type, contract, status; per-client detail with billing
- Inventory SKU — stock monitoring with aman/menipis/kritis status, restock alerts
- Fulfillment Operations — 5 daily operational forms: Inbound, Outbound, Return, Withdrawal, Expired
- Warehouse Map — visual grid of pallet positions, color-coded occupancy, hover tooltips
- Billing — monthly billing breakdown per client, 8 fee components, auto-calculation toggle

### Business rules implemented
- Dead stock fee: 2× normal rate for items inactive >90 days (warning at day 60)
- Tiering fee: Small 1× / Medium 1.5× / Large 2× multiplier per SKU size
- Minimum billing floor per client
- Auto-calculation from transaction data (not manual input)

### Tech stack
Next.js 16 App Router · TypeScript · Tailwind CSS v4 · shadcn/ui v4 (Nova preset) ·
Recharts 3.x · Lucide React · Mock JSON + localStorage · Vercel

### Project structure
```
src/
├── app/
│   ├── dashboard/
│   ├── clients/
│   ├── inventory/
│   ├── fulfillment/
│   ├── warehouse/
│   └── billing/
├── components/layout/ + ui/
├── data/mock/ (clients, skus, transactions, billing, pallets, warehouse)
├── lib/ (utils, billing-engine)
└── types/
```

### Documentation in repo
- `CLAUDE.md` — project instructions for Claude Code
- `AGENTS.md` — agent instructions
- `README.md` — full business context (in Bahasa Indonesia)
- `hybrid_warehouse_fulfillment_grounding.md` — business grounding document
- `supabase_schema.md` — production schema design (for future Supabase migration)

---

## Summary for Portfolio

| Project | Stack | Scale | Status | Live |
|---|---|---|---|---|
| NSMS (CRM) | Next.js + Supabase | National sales team | Production | Private |
| SIRUP Scraper | Python | 514 districts | Published | — |
| Warehouse Dashboard | Next.js + shadcn | Prototype | Deployed | [vercel.app](https://warehouse-fulfillment-dashboard.vercel.app/dashboard) |
| Funnel (v1 CRM) | HTML + GAS | Prototype → Production | Archived | GitHub Pages |

### Key narrative for recruiters
- Shows full development lifecycle: prototype → production
- Demonstrates business domain knowledge (sales, procurement, logistics, billing)
- All projects built for real organizations or real business contexts, not toy demos
- Consistent Next.js 16 + TypeScript + shadcn/ui stack across frontend projects
