// app/actions/user-actions.ts
"use server";

import { ROUTE_PATH } from "@/lib/constant";
import { revalidatePath } from "next/cache";

export async function revalidateSuppliers() {
  revalidatePath(ROUTE_PATH.ADMIN.supplier.suppliersList); // Replace with your actual path
}
