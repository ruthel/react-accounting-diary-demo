import { useRef, useState } from 'react'
import AccountingDiary, { PeriodChart, useAccountingDiary } from 'react-accounting-diary'
import type { AccountingDiaryHandle, IDataItem, PeriodGranularity, ReconciliationFilter } from 'react-accounting-diary'
import './App.css'

const initialEntries: IDataItem[] = [
  { id: 'opening', date: '2026-01-05', text: 'Opening deposit', account: 'Bank', amount: 2400, currency: 'USD', isDebit: true, reconciled: true, category: 'Capital' },
  { id: 'capital', date: '2026-01-05', text: 'Capital contribution', account: 'Capital', amount: 2400, currency: 'USD', reconciled: true, category: 'Capital' },
  { id: 'rent', date: '2026-01-15', text: 'Office rent', account: 'Rent', amount: 650, currency: 'USD', isDebit: true, category: 'Expenses', tags: ['monthly'] },
  { id: 'rent-bank', date: '2026-01-15', text: 'Rent paid from bank', account: 'Bank', amount: 650, currency: 'USD', category: 'Expenses' },
  { id: 'sale', date: '2026-02-10', text: 'Customer payment', account: 'Bank', amount: 1800, currency: 'USD', isDebit: true, reconciled: true, category: 'Sales' },
  { id: 'revenue', date: '2026-02-10', text: 'Sales revenue', account: 'Revenue', amount: 1800, currency: 'USD', category: 'Sales' },
  { id: 'supplies', date: '2026-03-02', text: 'Office supplies', account: 'Supplies', amount: 280, currency: 'USD', isDebit: true, reconciled: false, category: 'Expenses' },
  { id: 'supplies-bank', date: '2026-03-02', text: 'Supplies paid from bank', account: 'Bank', amount: 280, currency: 'USD', category: 'Expenses' },
  { id: 'euro-bank', date: '2026-03-12', text: 'European customer payment', account: 'Euro bank', amount: 900, currency: 'EUR', isDebit: true, reconciled: true, category: 'Sales' },
  { id: 'euro-revenue', date: '2026-03-12', text: 'European sales revenue', account: 'Euro revenue', amount: 900, currency: 'EUR', reconciled: true, category: 'Sales' },
]
type DisplayMode = 'combined' | 'table' | 'chart'

function ChartDemo({ entries, period, onChange }: { entries: IDataItem[], period: PeriodGranularity, onChange: (entries: IDataItem[]) => void }) {
  const diary = useAccountingDiary({ initialData: entries, periodGranularity: period, onChange })
  return <section className="standalone-demo" aria-label="Standalone chart demo">
    <p>This chart uses <code>PeriodChart</code> and the headless hook independently. No accounting table or provider is mounted.</p>
    <div className="demo-controls">
      <label>Reconciliation <select value={diary.filters.reconciliation || 'all'} onChange={e => diary.setReconciliationFilter(e.target.value as ReconciliationFilter)}>
        <option value="all">All</option><option value="reconciled">Reconciled</option><option value="unreconciled">Unreconciled</option>
      </select></label>
      <button disabled={!diary.canUndo} onClick={diary.undo}>Undo</button><button disabled={!diary.canRedo} onClick={diary.redo}>Redo</button>
      <span>{diary.filteredData.length} matching transactions</span>
    </div>
    <PeriodChart data={diary.filteredData} periodGranularity={period} />
    <h2>Try reconciliation without the table</h2>
    <ul className="transaction-list">{diary.filteredData.map(item => <li key={item.id}>
      <span><strong>{item.text}</strong><small>{item.date} · {item.currency} {item.amount} · {item.reconciled ? 'Reconciled' : 'Unreconciled'}</small></span>
      <button onClick={() => { void diary.setReconciled(item.id!, !item.reconciled) }}>{item.reconciled ? 'Mark unreconciled' : 'Mark reconciled'}</button>
    </li>)}</ul>
    {diary.filteredData.length === 0 && <p>No matching transactions. Choose All or undo your last change.</p>}
    <details><summary>View period summary data</summary><pre>{JSON.stringify(diary.periodSummary, null, 2)}</pre></details>
  </section>
}

function App() {
  const ref = useRef<AccountingDiaryHandle>(null)
  const [mode, setMode] = useState<DisplayMode>('combined')
  const [period, setPeriod] = useState<PeriodGranularity>('month')
  const [entries, setEntries] = useState<IDataItem[]>(initialEntries)
  const [revision, setRevision] = useState(0)
  const [message, setMessage] = useState('')
  return <main className="demo-page">
    <header className="demo-header"><div><span className="version-badge">v2.5.0</span><h1>React Accounting Diary</h1><p>Reconciliation, period balances and charts with or without the diary.</p></div><a href="https://github.com/ruthel/react-accounting-diary#readme">Documentation ↗</a></header>
    <section className="demo-intro"><strong>New in 2.5.0</strong><p>Reconcile transactions, filter their status, and compare debit and credit by day, month or year. Period balances keep USD and EUR separate.</p><p>Try all three display modes. Entries without a status are unreconciled. The chart follows filters across all pages.</p></section>
    <div className="demo-controls">
      <div className="mode-selector" role="group" aria-label="Display mode">{([['combined', 'Table + chart'], ['table', 'Table only'], ['chart', 'Chart only']] as const).map(([value, label]) => <button key={value} aria-pressed={mode === value} onClick={() => { setMode(value); setMessage('') }}>{label}</button>)}</div>
      <label>Period <select value={period} onChange={e => setPeriod(e.target.value as PeriodGranularity)}><option value="day">Day</option><option value="month">Month</option><option value="year">Year</option></select></label>
      <button onClick={() => { setEntries(initialEntries); setRevision(v => v + 1); setMessage('Demo data restored.') }}>Reset demo</button>
    </div>
    {mode === 'chart' ? <ChartDemo key={revision} entries={entries} period={period} onChange={setEntries} /> : <>
      <div className="demo-controls">
        <button onClick={async () => { const ok = await ref.current?.setReconciled('rent', true); setMessage(ok ? 'Rent reconciled through the ref API. Try Undo.' : 'Restore demo data to try this transaction again.') }}>Reconcile rent (ref)</button>
        <button onClick={() => ref.current?.setReconciliationFilter('unreconciled')}>Show unreconciled (ref)</button>
        <button onClick={() => ref.current?.setReconciliationFilter('all')}>Show all (ref)</button>
        <button onClick={() => ref.current?.exportToJSON()}>Export JSON</button><button onClick={() => ref.current?.exportToCSV()}>Export CSV</button>
        <button onClick={() => setMessage(JSON.stringify(ref.current?.getPeriodSummary(period), null, 2))}>Show period summary (ref)</button>
      </div>
      <div className="diary-container"><AccountingDiary key={revision} ref={ref} data={entries} title="Demo Company" titleBg="#e0f2fe" columnHeader showGrandTotal showLedgerToggle showPeriodChart={mode === 'combined'} periodGranularity={period} pageSize={5} onChange={setEntries}
        onBeforeAdd={item => { if (item.amount > 1000000) { alert('Amount exceeds the demo limit.'); return false } return true }}
        onBeforeDelete={item => confirm(`Delete "${item.text}"?`)} /></div>
    </>}
    <pre className="demo-message" role="status" aria-live="polite">{message}</pre>
    <footer className="demo-footer">Changes stay in this page. Switching between table and standalone chart keeps transactions; each view starts a new undo history.</footer>
  </main>
}
export default App
