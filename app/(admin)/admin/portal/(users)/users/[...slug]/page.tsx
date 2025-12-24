import { getUserById } from "@/gql/admin/api/users/get-user-by-id";
import { ROUTE_PATH } from "@/lib/constant";
import { redirect } from "next/navigation";
import UserDetailsForm from "./components/user-details-form";

async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const userId = slug[1];

  if (userId) {
    const { user } = await getUserById(userId);

    try {
      return <UserDetailsForm user={user} />;
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        redirect(ROUTE_PATH.ADMIN.login);
      }
    }
  } else return <UserDetailsForm />;
}

export default Page;
