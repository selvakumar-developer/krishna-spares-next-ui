// hooks/useUpdateUser.ts
import { revalidateUsers } from "@/app/actions/admin/users";
import { gql, useMutation } from "@apollo/client";
import { FileEntity } from "../common/interface/file";
import { CreateUserInput } from "./use-create-user";

const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
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

export interface UpdateUserInput
  extends Omit<CreateUserInput, "profilePicture"> {
  profilePicture?: File;
  keepExistingImage: boolean;
  id: string;
}

export interface UpdateUserResponse {
  id: string;
  email: string;
  fullName: string;
  mobileNumber: string;
  profilePicture: FileEntity;
  createdAt: string;
  updatedAt: string;
}

export const useUpdateUser = () => {
  const [updateUserMutation, { data, loading, error }] = useMutation<
    { updateUser: UpdateUserResponse },
    { updateUserInput: UpdateUserInput }
  >(UPDATE_USER);

  const updateUser = async (updateUserInput: UpdateUserInput) => {
    try {
      const result = await updateUserMutation({
        variables: { updateUserInput },
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
    updateUser,
    data,
    loading,
    error,
  };
};
