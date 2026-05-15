# Roadmap — react-accounting-diary

## ✅ Shipped

### v1.0.0 — Initial Release
- [x] Basic accounting diary with add transaction
- [x] PDF export
- [x] React 18 support

### v1.1.0
- [x] PNG/JPEG export
- [x] Custom styling props
- [x] Column header configuration

### v1.2.0
- [x] Multi-currency support
- [x] Undo/Redo functionality
- [x] Sample data loading

### v2.1.0
- [x] Edit transactions
- [x] Search & filter (text + date range)
- [x] Dark/Light theme support
- [x] CSV/Excel export
- [x] CSV import
- [x] Print-ready CSS
- [x] ARIA labels & keyboard navigation

### v2.2.0
- [x] Callback props (`onChange`, `onAdd`, `onEdit`, `onDelete`)
- [x] Controlled mode (external state management)
- [x] i18n / Localisation via `labels` prop (30+ keys)
- [x] Grand total & balance validation
- [x] Sortable columns (date, account, amount)
- [x] Pagination (`pageSize` prop)
- [x] Delete transaction
- [x] Empty state with CTA
- [x] Keyboard navigation (Tab, Enter, Space, Escape)

### v2.3.0
- [x] Headless hook (`useAccountingDiary`)
- [x] Imperative ref API (`AccountingDiaryHandle`)
- [x] Validation callbacks (`onBeforeAdd`, `onBeforeEdit`, `onBeforeDelete`)
- [x] Ledger view (group by account + running balance)
- [x] Category & tags fields (searchable)
- [x] JSON import/export (toolbar, ref API, hook)
- [x] `showLedgerToggle` prop
- [x] `onExport` callback

### v2.3.1
- [x] Live demo on Vercel
- [x] Demo link in README
- [x] Fixed default locale to `en-US`
- [x] Fixed default currency to `USD`
- [x] Moved `dev-to-article.md` to demo project

---

## 🚧 In Progress / Next Up

### v2.4.0 — UX & Productivity ✅
- [x] Screenshot/GIF in README
- [x] Transaction templates — reusable presets (rent, salary, etc.)
- [x] Drag & drop import — drop CSV/JSON files onto the component
- [x] Filter dropdown — filter by account/category (in addition to text search)

### v2.5.0 — Pro Features
- [ ] Mini chart — debit/credit visualization by month (`showChart` prop)
- [ ] Multi-journal support (purchases, sales, bank, cash)
- [ ] Reconciliation — mark transactions as reconciled

---

## 💡 Future Ideas (not yet planned)

### Performance
- [ ] Virtualization (react-virtual) — handle thousands of rows without lag

### Data & Accounting
- [ ] Recurring transactions — `recurrence` field for periodic entries (monthly, weekly, etc.)
- [ ] Multi-currency conversion — exchange rates + automatic total conversion
- [ ] Chart of accounts presets — OHADA, SYSCOHADA, IFRS, PCG templates
- [ ] Attachments — link receipts/invoices to transactions

### Extensibility
- [ ] Plugin system — custom columns and actions
- [ ] Drag & drop reorder — rearrange transactions by dragging

### Developer Experience
- [ ] Storybook — interactive component documentation
- [ ] Online playground — live prop editor in docs

---

## 📣 Marketing & Growth
- [ ] Publish dev.to article (draft ready in demo repo)
- [ ] Post on r/reactjs with demo GIF
- [ ] Add `good first issue` labels on GitHub
- [ ] Answer StackOverflow questions related to "react accounting"
- [ ] Tweet/X with interactive demo
