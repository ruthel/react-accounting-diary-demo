import AccountingDiaryWrapper from 'react-accounting-diary'

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <AccountingDiaryWrapper
        width={1200}
        title="My Company"
        titleBg="#b0d0a3"
        columnHeader={true}
        showGrandTotal={true}
        pageSize={10}
        onChange={(data) => console.log('Data changed:', data)}
        onAdd={(item) => console.log('Added:', item)}
        onDelete={(item) => console.log('Deleted:', item)}
        onEdit={(old, updated) => console.log('Edited:', old, '->', updated)}
      />
    </div>
  )
}

export default App
