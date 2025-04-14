import { ROUTE_PATH } from "@/lib/constant";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(`${ROUTE_PATH.ADMIN.base}/${ROUTE_PATH.ADMIN.dashboard}`);
}
