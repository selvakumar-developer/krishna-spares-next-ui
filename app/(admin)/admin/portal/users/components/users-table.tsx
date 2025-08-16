"use client";
import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { PaginatedApiResponse } from "@/gql/admin/users";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";

function UsersTable({ usersPaginated }: PaginatedApiResponse) {
  const { data, pagination } = usersPaginated;

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="grid grid-cols-1 gap-2">
      <DataTable columns={columns} data={data} />
      <DataTablePagination table={table} />
    </div>
  );
}

export default UsersTable;
