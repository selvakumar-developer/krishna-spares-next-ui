import { DataTable } from "@/components/ui/data-table";
import { GET_ALL_USERS } from "@/gql/admin";
import { query } from "@/lib/client";
import { columns } from "./components/columns";

async function Page() {
    const { data } = await query({ query: GET_ALL_USERS });
    return (
        <DataTable columns={columns} data={data.users} />
    )
}

export default Page