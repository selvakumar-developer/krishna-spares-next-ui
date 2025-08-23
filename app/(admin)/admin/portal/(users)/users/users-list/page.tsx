import { getUsersPaginated } from "@/gql/admin/api/users/useUsersPaginated";
import { ROUTE_PATH } from "@/lib/constant";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import UsersTable from "./components/users-table";

async function Page() {
  try {
    const { users, pagination, loading } = await getUsersPaginated({
      page: 1,
      limit: 10,
    });

    return (
      <Suspense fallback={<div>Loading...</div>}>
        {!loading && (
          <UsersTable
            usersPaginated={{ data: users, pagination: pagination }}
          />
        )}
      </Suspense>
    );
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      redirect(ROUTE_PATH.ADMIN.login);
    }
  }
}

export default Page;
