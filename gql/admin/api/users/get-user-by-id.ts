import { query } from "@/lib/client";
import { gql } from "@apollo/client";
import { User } from "./user";

export interface GetUserByIdApiResponse {
  user: User;
}

export const GET_USER_BY_ID = gql`
  query User($userId: String!) {
    user(id: $userId) {
      _id
      address {
        city
        country
        postalCode
        state
        street
      }
      email
      fullName
      createdAt
      mobileNumber
      profilePicture {
        url
      }
      updatedAt
    }
  }
`;

export const getUserById = async (userId: string) => {
  const { data, loading, error } = await query<GetUserByIdApiResponse>({
    query: GET_USER_BY_ID,
    variables: { userId },
  });

  return {
    user: data?.user,
  };
};
