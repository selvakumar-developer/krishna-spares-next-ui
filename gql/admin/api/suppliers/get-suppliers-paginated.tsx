import { query } from "@/lib/client";
import { gql } from "@apollo/client";
import { Pagination, PaginationArgs } from "../common/interface/pagination";
import { Supplier } from "./supplier";

export interface PaginatedApiResponse {
  suppliersPaginated: {
    data: Supplier[];
    pagination: Pagination;
  };
}

export const GET_SUPPLIERS_PAGINATED = gql`
  query SuppliersPaginated($paginationArgs: PaginationArgs) {
    suppliersPaginated(paginationArgs: $paginationArgs) {
      data {
        _id
        fullName
        mobileNumber
        createdAt
        updatedAt
      }
      pagination {
        currentPage
        totalPages
        totalItems
        itemsPerPage
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const getSuppliersPaginated = async (paginationArgs: PaginationArgs) => {
  try {
    const { data, loading, error } = await query<PaginatedApiResponse>({
      query: GET_SUPPLIERS_PAGINATED,
      variables: { paginationArgs },
    });

    return {
      suppliers: data?.suppliersPaginated.data || [],
      pagination: data?.suppliersPaginated.pagination,
      loading,
      error,
    };
  } catch (error) {
    throw error;
  }
};
