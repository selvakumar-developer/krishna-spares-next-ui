import UserDetailsForm from "./components/user-details-form";

async function Page({}: { params: Promise<{ slug: string }> }) {
  // const { slug } = await params;

  return <UserDetailsForm />;
}

export default Page;
