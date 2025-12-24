import { gql, useQuery } from "@apollo/client";
import { User } from "./user";

export interface UsersResponse {
  users: User[];
}

// GraphQL Queries
export const GET_ALL_USERS = gql`
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

// Hook for getting all users
export const useUsers = (options?: {
  skip?: boolean;
  pollInterval?: number;
}) => {
  const { data, loading, error, refetch } = useQuery<UsersResponse>(
    GET_ALL_USERS,
    {
      skip: options?.skip,
      pollInterval: options?.pollInterval,
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    }
  );

  return {
    users: data?.users || [],
    loading,
    error,
    refetch,
  };
};
