import { gql } from "@apollo/client";

const GET_ALL_USERS = gql`
  query Users {
    users {
      email
      fullName
      mobileNumber
      createdAt
      updatedAt
    }
  }
`;

export interface PaginatedApiResponse {
  usersPaginated: {
    data: User[];
    pagination: Pagination;
  };
}

interface User {
  email: string;
  address: Address[];
  createdAt: string; // ISO date string
  fullName: string;
  isDeleted: boolean;
  mobileNumber: string;
  updatedAt: string; // ISO date string
}

interface Address {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
}

interface Pagination {
  currentPage: number;
  hasNextPage: boolean;
  totalItems: number;
  totalPages: number;
}

const GET_USERS_PAGINATED = gql`
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

export { GET_ALL_USERS, GET_USERS_PAGINATED };
