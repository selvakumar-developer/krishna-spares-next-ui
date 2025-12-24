import { revalidateSuppliers } from "@/app/actions/admin/suppliers";
import { gql, useMutation } from "@apollo/client";
import { CreateSupplierInput } from "./use-create-supplier";

const UPDATE_SUPPLIER = gql`
  mutation UpdateSupplier($updateSupplierInput: UpdateSupplierInput!) {
    updateSupplier(updateSupplierInput: $updateSupplierInput) {
      fullName
      mobileNumber
      createdAt
      updatedAt
    }
  }
`;

export interface UpdateSupplierInput extends CreateSupplierInput {
  id: string;
}

export interface UpdateSupplierResponse {
  id: string;
  fullName: string;
  mobileNumber: string;
  createdAt: string;
  updatedAt: string;
}

export const useUpdateSupplier = () => {
  const [updateSupplierMutation, { data, loading, error }] = useMutation<
    { updateSupplier: UpdateSupplierResponse },
    { updateSupplierInput: UpdateSupplierInput }
  >(UPDATE_SUPPLIER);

  const updateSupplier = async (updateSupplierInput: UpdateSupplierInput) => {
    try {
      const result = await updateSupplierMutation({
        variables: { updateSupplierInput },
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
    updateSupplier,
    data,
    loading,
    error,
  };
};
