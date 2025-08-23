"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { PaginatedApiResponse } from "@/gql/admin/api/users/useUsersPaginated";
import { ROUTE_PATH } from "@/lib/constant";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

function UsersTable({ usersPaginated }: PaginatedApiResponse) {
  const { data } = usersPaginated;
  const { push } = useRouter();
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleNewUser = () => {
    push(ROUTE_PATH.ADMIN.createUser);
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <Button size={"sm"} className="justify-self-end" onClick={handleNewUser}>
        <Plus /> New User
      </Button>
      <DataTable columns={columns} data={data} />
      <DataTablePagination table={table} />
    </div>
  );
}
export default UsersTable;
