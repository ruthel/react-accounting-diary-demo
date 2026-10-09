# React Accounting Diary — v2.5.0 Demo

Interactive demo for [react-accounting-diary](https://www.npmjs.com/package/react-accounting-diary).

[Live demo](https://react-accounting-diary-demo.vercel.app)

## What to try

- **Table + chart:** the diary and a chart of all filtered transactions, before pagination.
- **Table only:** the accounting diary without the chart.
- **Chart only:** `PeriodChart` with `useAccountingDiary`, without the accounting table or its provider. Reconcile entries, filter them and try Undo/Redo.
- **Day / Month / Year:** change grouping without changing transaction data.
- **Reconciliation:** All / Reconciled / Unreconciled, the row menu, add/edit dialog and ref controls.
- **Period balances:** debit minus credit per currency; USD and EUR stay separate. Entries start balanced; status filters can show a nonzero balance.
- Search, account/category filters, templates, drag-and-drop CSV/JSON imports, ledger view and pagination remain available.

Transactions are shared when switching views. Switching between the table and standalone chart starts a new undo history; switching between Table only and Table + chart preserves history. Reset demo restores the sample. Changes are not saved after reload.

## Setup after the npm release

The app pins `react-accounting-diary` to **2.5.0**. Publish that version first.

```bash
npm install react-accounting-diary@2.5.0 --save-exact
npm run dev
```

Commit the resulting registry-based `package-lock.json` after publication. The original repository had no lockfile; a local tarball lockfile is intentionally not committed.

Development/build requires Node 20.19+ or 22.12+ for Vite. Validation used Node 24 and React 19.

## Validate the local package before publication

From the sibling library repository, create the ignored `work` folder if needed, then:

```bash
npm run prepublishOnly
npm pack --pack-destination work
```

From this demo directory:

```bash
npm install --no-save --package-lock=false ../react-accounting-diary/work/react-accounting-diary-2.5.0.tgz
npm run lint
npm run build
npm run dev
```

This installs the packaged library locally without changing the registry dependency in `package.json`.

## Publication and Vercel

Vercel Web Analytics is mounted once at the app root through `@vercel/analytics/react`. Enable Web Analytics for the Vercel project, deploy, then visit the deployed demo to start collecting page views. Development mode does not collect analytics. No custom events or transaction data are sent by this integration.

1. Publish `react-accounting-diary@2.5.0` from the library repository.
2. Install the released version here using the command above; run lint and build.
3. Commit and push the demo changes and registry lockfile to the branch connected to Vercel.
4. Vercel uses the Vite framework, `npm run build`, and the `dist` output directory, as declared in `vercel.json`.

Deployment has no dependency on a sibling folder or local archive. It requires the npm release to exist. The local configuration is ready; the remote Git integration and deployment have not been changed or verified here.

## Roadmap

See [ROADMAP.md](ROADMAP.md). Multi-journal support remains a future feature.
