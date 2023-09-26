"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: {
    collection: TData[];
    hasNext: boolean;
    hasPrev: boolean;
    page: number;
    size: number;
    totalDocs: number;
    totalPages: number;
    startIndex: number;
  };
  page: number;
  setPage: Dispatch<SetStateAction<number>>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  setPage
}: DataTableProps<TData, TValue>) {  
  const table = useReactTable({
    data: data?.collection,
    columns,
    pageCount: data?.totalPages,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader >
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id} className="btn-primary">
                  <TableHead className="text-white">SN</TableHead>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-white">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow key={row.id}>
                  <TableCell>{data.startIndex + i}</TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination */}
      <div className="flex justify-between py-6">
        <div>
          <p className="text-purple-800">{`Showing page ${page} of ${data.totalPages}`}</p>
        </div>
        <div className="flex items-center justify-start space-x-2">
          <Button
            className=" text-purple-800 border-purple-800"
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
              setPage(page - 1)
            }}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            className=" text-purple-800 border-purple-800"
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
              setPage(page + 1)
            }}
            disabled={data?.totalPages === page}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

