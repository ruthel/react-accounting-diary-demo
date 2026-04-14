---
title: "I built a headless hook, ref API & ledger view for my React accounting component"
published: false
description: "react-accounting-diary v2.3.0: headless hook, imperative ref API, ledger view, validation callbacks, category/tags, JSON import/export."
tags: react, typescript, opensource, webdev
cover_image:
---

## TL;DR

[react-accounting-diary](https://www.npmjs.com/package/react-accounting-diary) is a lightweight React component for generating accounting diaries with export to PNG, JPEG, PDF, CSV, Excel, and JSON.

**v2.3.0** adds 6 major features that turn it from a UI component into a full accounting toolkit. Here's what changed.

> **[Live Demo →](https://react-accounting-diary-demo.vercel.app)**

---

## What's new in v2.3.0

### 1. Headless hook — `useAccountingDiary`

The biggest addition. Build your own UI while leveraging the full data layer:

```jsx
import { useAccountingDiary } from 'react-accounting-diary';

function CustomDiary() {
  const {
    data,
    addTransaction,
    editTransaction,
    deleteTransaction,
    undo, redo, canUndo, canRedo,
    totals,
    accountSummary,
    importJSON, exportJSON,
  } = useAccountingDiary({
    initialData: [],
    onChange: (data) => saveToBackend(data),
    onBeforeAdd: (item) => item.amount > 0,
    onBeforeDelete: (item) => confirm(`Delete "${item.text}"?`),
  });

  return (
    <div>
      <p>Debit: {totals.debit} | Credit: {totals.credit}</p>
      <p>{totals.isBalanced ? '✓ Balanced' : '⚠ Unbalanced'}</p>
      <button onClick={() => addTransaction({
        date: '2024-01-01', text: 'Rent', isDebit: true,
        amount: 1000, account: 'Rent', currency: 'USD',
      })}>Add</button>
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
    </div>
  );
}
```

You get: add/edit/delete with validation, undo/redo, computed totals, per-account summary, JSON import/export — all without rendering a single component.

### 2. Imperative ref API

Control the component programmatically from a parent:

```jsx
import AccountingDiary from 'react-accounting-diary';
import { useRef } from 'react';

function App() {
  const ref = useRef(null);

  return (
    <>
      <button onClick={() => ref.current?.exportToPDF()}>PDF</button>
      <button onClick={() => ref.current?.exportToJSON()}>JSON</button>
      <button onClick={() => ref.current?.addTransaction({
        date: '2024-01-01', text: 'Salary', isDebit: true,
        amount: 5000, account: 'Payroll', currency: 'USD',
      })}>Add via Ref</button>
      <button onClick={() => console.log(ref.current?.getTotals())}>Totals</button>
      <button onClick={() => console.log(ref.current?.getAccountSummary())}>Accounts</button>
      <AccountingDiary ref={ref} title="My Company" columnHeader={true} />
    </>
  );
}
```

13 methods available: `exportToPNG`, `exportToJPEG`, `exportToPDF`, `exportToCSV`, `exportToExcel`, `exportToJSON`, `importJSON`, `addTransaction`, `undo`, `redo`, `getData`, `getTotals`, `getAccountSummary`.

### 3. Validation callbacks — `onBefore*`

Intercept and block mutations before they happen:

```jsx
<AccountingDiary
  data={data}
  onBeforeAdd={(item) => {
    if (item.amount > 100000) {
      alert('Amount too high!');
      return false; // blocks the add
    }
    return true;
  }}
  onBeforeEdit={(old, updated) => confirm(`Change ${old.account}?`)}
  onBeforeDelete={(item) => confirm(`Delete "${item.text}"?`)}
  onChange={setData}
/>
```

Supports both sync (`boolean`) and async (`Promise<boolean>`) — perfect for server-side validation.

### 4. Ledger view

Toggle between diary view (grouped by date) and ledger view (grouped by account):

```jsx
<AccountingDiary data={data} showLedgerToggle={true} columnHeader={true} />
```

The ledger view shows:
- Transactions grouped by account name
- Running balance per account
- Per-account debit/credit totals
- Color-coded balances (green for debit, red for credit)

### 5. Category & tags

Classify transactions with optional fields:

```jsx
const data = [
  {
    date: '2024-01-01',
    text: 'Office rent',
    isDebit: true,
    amount: 2000,
    account: 'Rent',
    currency: 'USD',
    category: 'Operating',
    tags: ['monthly', 'fixed'],
  },
];
```

Both are searchable via the search filter. The add/edit dialog now includes category and tags fields.

### 6. JSON import/export

In addition to CSV and Excel:

- **Toolbar**: JSON import button in the toolbar
- **Ref API**: `ref.current.exportToJSON()` / `ref.current.importJSON(jsonString)`
- **Hook**: `exportJSON()` / `importJSON(jsonString)`

---

## Quick recap — all features

- ✅ Headless hook (`useAccountingDiary`)
- ✅ Imperative ref API (13 methods)
- ✅ Validation callbacks (`onBeforeAdd`, `onBeforeEdit`, `onBeforeDelete`)
- ✅ Ledger view with running balance
- ✅ Category & tags (searchable)
- ✅ JSON import/export
- ✅ Export to PNG, JPEG, PDF, CSV, Excel, JSON
- ✅ Import from CSV and JSON
- ✅ Callback props (`onChange`, `onAdd`, `onEdit`, `onDelete`)
- ✅ i18n / Localisation (36+ label keys)
- ✅ Sortable columns, pagination, grand total
- ✅ Undo/Redo, dark mode, keyboard navigation
- ✅ ~21KB gzipped, zero external CSS

---

## Install

```bash
npm install react-accounting-diary
```

## Minimal example

```jsx
import AccountingDiary from 'react-accounting-diary';

function App() {
  return (
    <AccountingDiary
      title="My Company"
      columnHeader={true}
      showGrandTotal={true}
      showLedgerToggle={true}
      pageSize={10}
      onChange={(data) => console.log(data)}
    />
  );
}
```

## Numbers

- **Bundle:** ~21KB gzipped (ESM)
- **React:** 16.8+ / 17 / 18 / 19
- **TypeScript:** full support with exported types
- **Zero external CSS**

---

## What's next

- [ ] Transaction templates (rent, salary — reusable presets)
- [ ] Drag & drop import (CSV/JSON files onto the component)
- [ ] Filter dropdown by account/category
- [ ] Mini chart — debit/credit visualization by month
- [ ] Multi-journal support (purchases, sales, bank, cash)

---

**Live Demo:** [react-accounting-diary-demo.vercel.app](https://react-accounting-diary-demo.vercel.app)
**GitHub:** [ruthel/react-accounting-diary](https://github.com/ruthel/react-accounting-diary)
**npm:** [react-accounting-diary](https://www.npmjs.com/package/react-accounting-diary)

If this is useful, a ⭐ on GitHub helps a lot. Feedback and PRs welcome.
