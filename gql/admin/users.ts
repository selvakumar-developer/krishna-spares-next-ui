import { gql } from "@apollo/client";

const GET_ALL_USERS = gql`
query Users {
  users {
    email,
    fullName,
    mobileNumber
  }
}`

export {
    GET_ALL_USERS
};
