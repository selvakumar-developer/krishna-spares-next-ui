import { getSuppliersPaginated } from "@/gql/admin/api/suppliers/get-suppliers-paginated";
import { ROUTE_PATH } from "@/lib/constant";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SuppliersTable from "./components/suppliers-table";

async function Page() {
  try {
    const { suppliers, pagination, loading } = await getSuppliersPaginated({
      page: 1,
      limit: 10,
    });
    console.log("Hello");

    return (
      <Suspense fallback={<div>Loading...</div>}>
        {!loading && (
          <SuppliersTable
            suppliersPaginated={{ data: suppliers, pagination: pagination }}
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
