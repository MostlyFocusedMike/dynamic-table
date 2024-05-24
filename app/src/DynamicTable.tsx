// @ts-nocheck
import { useState, MouseEvent, ChangeEvent } from 'react';
type DynamicTableProps = {
  rows: any[];
  updateRow: Function;
}

const DynamicRow = ({ rowIdx, row, headers, updateRow }: any) => {
  const initInputs = Array(headers.length).fill(true);
  const [localRow, setLocalRow] = useState(row);
  const [dirtyInputs, setDirtyInputs] = useState(initInputs);

  const handleSave = (e) => {
    setDirtyInputs(initInputs);
    updateRow(rowIdx, localRow);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { key, colIdx } = (e.target as HTMLElement).dataset;
    if (!key || !colIdx) return;
    setLocalRow({ ...localRow, [key]: e.target.value });
    const newDirty = [...dirtyInputs];
    newDirty[colIdx] = e.target.value === row[key]
    setDirtyInputs(newDirty);
  }

  return <>
    <tr key={row.id}>
      <td><a href="#">User {row.id}</a></td>
      <td><button onClick={handleSave} disabled={dirtyInputs.every(Boolean)}>Save</button></td>
      {
        headers.map((header: any, colIdx: number) => <td key={ header + row.id } >

          <input
            data-row-idx={rowIdx}
            data-col-idx={colIdx}
            data-key={header}
            type="text"
            value={localRow[header]}
            onChange={handleChange}
          />
        </td>)
      }
    </tr>
  </>
}

export default function DynamicTable({ rows, updateRow }: DynamicTableProps) {
  const headers = Object.keys(rows[0]).filter(header => !['address', 'id', 'company'].includes(header));
  return <table>
    <thead>
      <tr>
        <th colSpan={2}></th>
        { headers.map((header) => <th key={header}>{header}</th>) }
      </tr>
    </thead>
    <tbody>
      {
        rows.map((row, idx) => {
          return <DynamicRow
            key={row.id}
            rowIdx={idx}
            row={row}
            headers={headers}
            updateRow={updateRow}
          />
        })
      }
    </tbody>
  </table>
}