// hooks/useCreateUser.ts
import { revalidateUsers } from "@/app/actions/admin/users";
import { gql, useMutation } from "@apollo/client";
import { FileEntity } from "../common/interface/file";

const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      email
      fullName
      mobileNumber
      profilePicture {
        filename
        url
        size
      }
      createdAt
      updatedAt
    }
  }
`;

export interface CreateUserInput {
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  profilePicture: File;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface CreateUserResponse {
  id: string;
  email: string;
  fullName: string;
  mobileNumber: string;
  profilePicture: FileEntity;
  createdAt: string;
  updatedAt: string;
}

export const useCreateUser = () => {
  const [createUserMutation, { data, loading, error }] = useMutation<
    { createUser: CreateUserResponse },
    { createUserInput: CreateUserInput }
  >(CREATE_USER);

  const createUser = async (createUserInput: CreateUserInput) => {
    try {
      const result = await createUserMutation({
        variables: { createUserInput },
        refetchQueries: [""], // Refetch users list if you have one
        awaitRefetchQueries: true,
      });
      await revalidateUsers();
      return result;
    } catch (err) {
      throw err;
    }
  };

  return {
    createUser,
    data,
    loading,
    error,
  };
};
