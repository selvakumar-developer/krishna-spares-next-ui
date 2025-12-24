import { query } from "@/lib/client";
import { gql } from "@apollo/client";
import { Supplier } from "./supplier";

export interface GetSupplierByIdApiResponse {
  supplier: Supplier;
}

export const GET_SUPPLIER_BY_ID = gql`
  query Supplier($supplierId: String!) {
    supplier(id: $supplierId) {
      _id
      fullName
      createdAt
      mobileNumber
      updatedAt
    }
  }
`;

export const getSupplierById = async (supplierId: string) => {
  const { data, loading, error } = await query<GetSupplierByIdApiResponse>({
    query: GET_SUPPLIER_BY_ID,
    variables: { supplierId },
  });

  return {
    supplier: data?.supplier,
  };
};
