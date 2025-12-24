// hooks/useCreateUser.ts
import { revalidateSuppliers } from "@/app/actions/admin/suppliers";
import { gql, useMutation } from "@apollo/client";

const CREATE_SUPPLIER = gql`
  mutation CreateSupplier($createSupplierInput: CreateSupplierInput!) {
    createSupplier(createSupplierInput: $createSupplierInput) {
      fullName
      mobileNumber
      createdAt
      updatedAt
    }
  }
`;

export interface CreateSupplierInput {
  fullName: string;
  mobileNumber: string;
}

export interface CreateSupplierResponse {
  id: string;
  fullName: string;
  mobileNumber: string;
  createdAt: string;
  updatedAt: string;
}

export const useCreateSupplier = () => {
  const [createSupplierMutation, { data, loading, error }] = useMutation<
    { createSupplier: CreateSupplierResponse },
    { createSupplierInput: CreateSupplierInput }
  >(CREATE_SUPPLIER);

  const createSupplier = async (createSupplierInput: CreateSupplierInput) => {
    try {
      const result = await createSupplierMutation({
        variables: { createSupplierInput },
        refetchQueries: [""],
        awaitRefetchQueries: true,
      });
      await revalidateSuppliers();
      return result;
    } catch (err) {
      throw err;
    }
  };

  return {
    createSupplier,
    data,
    loading,
    error,
  };
};
