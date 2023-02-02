import React, { useState, useRef, useEffect } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import type { SortingState } from '@tanstack/react-table';
import type { Virtualizer } from '@tanstack/react-virtual';

import { makeData } from './makeData';

export interface IDataRow {
  company: string,
  status: string,
  creditLimit: number,
  terms: string,
  lastUpdate: string,
}

function App() {

  const columns = React.useMemo<MRT_ColumnDef<IDataRow>[]>(
    () => [
      {
        header: 'Company',
        accessorKey: 'company',
      },
      {
        header: 'Status',
        accessorKey: 'status',
      },
      {
        header: 'Credit limit',
        accessorKey: 'creditLimit',
      },
      {
        header: 'Terms',
        accessorKey: 'terms',
      },
      {
        header: 'Last update',
        accessorKey: 'lastUpdate',
      },
    ],
    []
  );

  const rowVirtualizerInstanceRef =
    useRef<Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const [data, setData] = useState<IDataRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(makeData(40000));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    rowVirtualizerInstanceRef.current?.scrollToIndex(0);
  }, [sorting]);

  return (
    <div className="App">
      <MaterialReactTable
      columns={columns}
      data={data}
      enableBottomToolbar={false}
      enableColumnVirtualization
      enableGlobalFilterModes
      enablePagination={false}
      enablePinning
      enableRowNumbers
      enableRowVirtualization
      muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
      onSortingChange={setSorting}
      state={{ isLoading, sorting }}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //optional
      rowVirtualizerProps={{ overscan: 5 }} //optionally customize the row virtualizer
      columnVirtualizerProps={{ overscan: 2 }} //optionally customize the column virtualizer
    />
    </div>
  );
}

export default App;
