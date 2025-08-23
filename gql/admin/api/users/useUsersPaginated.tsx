import { query } from "@/lib/client";
import { gql } from "@apollo/client";
import { Pagination, PaginationArgs } from "../common/interface/pagination";
import { User } from "./users";

export interface PaginatedApiResponse {
  usersPaginated: {
    data: User[];
    pagination: Pagination;
  };
}

export const GET_USERS_PAGINATED = gql`
  query UsersPaginated($paginationArgs: PaginationArgs) {
    usersPaginated(paginationArgs: $paginationArgs) {
      data {
        email
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

export const getUsersPaginated = async (paginationArgs: PaginationArgs) => {
  const { data, loading, error } = await query<PaginatedApiResponse>({
    query: GET_USERS_PAGINATED,
    variables: { paginationArgs },
  });

  return {
    users: data?.usersPaginated.data || [],
    pagination: data?.usersPaginated.pagination,
    loading,
    error,
  };
};
