import { GET_USERS_PAGINATED, PaginatedApiResponse } from "@/gql/admin/users";
import { query } from "@/lib/client";
import { ROUTE_PATH } from "@/lib/constant";
import { redirect } from "next/navigation";
import UsersTable from "./components/users-table";

async function Page() {
  try {
    const { data } = await query<PaginatedApiResponse>({
      query: GET_USERS_PAGINATED,
      variables: {
        paginationArgs: {
          page: 1,
          limit: 10,
        },
      },
    });

    return <UsersTable usersPaginated={data.usersPaginated} />;
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      redirect(ROUTE_PATH.ADMIN.login);
    }
  }
}

export default Page;
