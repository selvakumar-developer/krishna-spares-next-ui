import { gql } from '@apollo/client';

// Define your mutation
const ADMIN_USER_LOGIN = gql`
  mutation AdminUserSignIn($adminUserSignIn: AdminSignInInput!) {
  adminUserSignIn(adminUserSignIn: $adminUserSignIn) {
    accessToken,
    refreshToken
  }
}
`;

export {
    ADMIN_USER_LOGIN
};
