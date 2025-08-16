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

export { GET_ALL_USERS };
