// app/actions/user-actions.ts
"use server";

import { ROUTE_PATH } from "@/lib/constant";
import { revalidatePath } from "next/cache";

export async function revalidateUsers() {
  revalidatePath(ROUTE_PATH.ADMIN.usersList); // Replace with your actual path
}
