import { useState, useEffect } from 'react'
import DynamicTable from './DynamicTable'

function App() {
  const [rows, setRows] = useState<any[] | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      const users: any[] = await fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json());
      console.log('users:', users);
      setRows(users);
    };
    getUsers();
  }, []);

  const updateRow = (rowIdx: number, newRow: any) => {
    if (!rows) return;
    const newRows = [...rows];
    newRows[rowIdx] = newRow;
    setRows(newRows);
  }


  if (!rows) return null;
  return (
    <>
      <h1>Dynamic Table Test</h1>
      <DynamicTable rows={rows} updateRow={updateRow} />
    </>
  )
}

export default App
