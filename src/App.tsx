import { useRef } from 'react'
import AccountingDiaryWrapper from 'react-accounting-diary'
import type { AccountingDiaryHandle } from 'react-accounting-diary'

function App() {
  const ref = useRef<AccountingDiaryHandle>(null)

  return (
    <div style={{ padding: '20px', maxWidth: 1300, margin: '0 auto' }}>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: 18, fontFamily: 'system-ui' }}>react-accounting-diary v2.4.0 Demo</h2>
        <span style={{ fontSize: 12, padding: '2px 8px', background: '#e0f2fe', color: '#0369a1', borderRadius: 4, fontWeight: 500 }}>
          Templates • Drag & Drop • Filter Dropdown
        </span>
      </div>

      <div style={{ marginBottom: 12, padding: 12, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'system-ui', color: '#475569' }}>
        <strong>New in v2.4.0:</strong> Try the <em>Templates</em> button to pre-fill transactions • Drag a CSV/JSON file onto the component • Use the filter dropdowns to filter by account or category
      </div>

      <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        <button onClick={() => ref.current?.exportToPDF()} style={{ padding: '6px 12px', fontSize: 12, cursor: 'pointer', borderRadius: 4, border: '1px solid #e2e8f0', background: 'white' }}>
          Export PDF (ref)
        </button>
        <button onClick={() => ref.current?.exportToJSON()} style={{ padding: '6px 12px', fontSize: 12, cursor: 'pointer', borderRadius: 4, border: '1px solid #e2e8f0', background: 'white' }}>
          Export JSON (ref)
        </button>
        <button onClick={() => console.log(ref.current?.getTotals())} style={{ padding: '6px 12px', fontSize: 12, cursor: 'pointer', borderRadius: 4, border: '1px solid #e2e8f0', background: 'white' }}>
          Log Totals
        </button>
        <button onClick={() => console.log(ref.current?.getAccountSummary())} style={{ padding: '6px 12px', fontSize: 12, cursor: 'pointer', borderRadius: 4, border: '1px solid #e2e8f0', background: 'white' }}>
          Account Summary
        </button>
      </div>

      <AccountingDiaryWrapper
        ref={ref}
        width={1260}
        title="My Company"
        titleBg="#b0d0a3"
        columnHeader={true}
        showGrandTotal={true}
        showLedgerToggle={true}
        pageSize={10}
        onChange={(data) => console.log('Data changed:', data.length, 'items')}
        onAdd={(item) => console.log('Added:', item)}
        onDelete={(item) => console.log('Deleted:', item)}
        onEdit={(old, updated) => console.log('Edited:', old, '->', updated)}
        onBeforeAdd={(item) => {
          if (item.amount > 1000000) {
            alert('Amount exceeds limit!')
            return false
          }
          return true
        }}
        onBeforeDelete={(item) => confirm(`Delete "${item.text}"?`)}
      />
    </div>
  )
}

export default App
