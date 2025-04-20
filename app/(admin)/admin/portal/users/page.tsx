import { DataTable } from "@/components/ui/data-table";
import { GET_ALL_USERS } from "@/gql/admin";
import { query } from "@/lib/client";
import { ROUTE_PATH } from "@/lib/constant";
import { redirect } from "next/navigation";
import { columns } from "./components/columns";

async function Page() {
  try {
    const { data } = await query({ query: GET_ALL_USERS });
    return <DataTable columns={columns} data={data.users} />;
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      redirect(ROUTE_PATH.ADMIN.login);
    }
  }
}

export default Page;
