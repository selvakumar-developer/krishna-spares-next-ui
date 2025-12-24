import { getSupplierById } from "@/gql/admin/api/suppliers/get-supplier-by-id";
import { ROUTE_PATH } from "@/lib/constant";
import { redirect } from "next/navigation";
import SupplierDetailsForm from "./components/supplier-details-form";

async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const supplierId = slug[1];

  if (supplierId) {
    const { supplier } = await getSupplierById(supplierId);

    try {
      return <SupplierDetailsForm supplier={supplier} />;
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        redirect(ROUTE_PATH.ADMIN.login);
      }
    }
  } else return <SupplierDetailsForm />;
}

export default Page;
