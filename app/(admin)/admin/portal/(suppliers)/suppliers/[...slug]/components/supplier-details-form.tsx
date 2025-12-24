"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Supplier } from "@/gql/admin/api/suppliers/supplier";
import {
  CreateSupplierInput,
  useCreateSupplier,
} from "@/gql/admin/api/suppliers/use-create-supplier";
import { useUpdateSupplier } from "@/gql/admin/api/suppliers/use-update-supplier";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRound } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const getFormSchema = () =>
  z.object({
    // Personal Details
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
  });

type FormData = z.infer<ReturnType<typeof getFormSchema>>;

interface SupplierDetailsFormProps {
  supplier?: Supplier;
}

function SupplierDetailsForm({ supplier }: SupplierDetailsFormProps) {
  const { back } = useRouter();
  const { slug } = useParams<{ slug: string[] }>();
  const isEditMode = slug && slug[0] === "edit";

  const { createSupplier, loading: createLoading } = useCreateSupplier();
  const { updateSupplier, loading: updateLoading } = useUpdateSupplier();

  const form = useForm<FormData>({
    resolver: zodResolver(getFormSchema()),
    defaultValues: {
      fullName: "",
      phone: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      const baseUserInput = {
        fullName: values.fullName,
        mobileNumber: values.phone,
      };

      let result;
      if (isEditMode) {
        const updateSupplierInput = {
          id: supplier?._id as string,
          ...baseUserInput,
        };
        result = await updateSupplier(updateSupplierInput);
      } else {
        const createSupplierInput: CreateSupplierInput = {
          ...baseUserInput,
        };
        result = await createSupplier(createSupplierInput);
      }

      if (result) {
        toast({
          title: "Success",
          description: isEditMode
            ? "Supplier updated successfully"
            : "Supplier created successfully",
        });
        back();
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: isEditMode
          ? "Failed to update supplier. Please try again."
          : "Failed to create supplier. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    back();
  };

  useEffect(() => {
    if (supplier) {
      form.reset({
        fullName: supplier?.fullName || "",
        phone: supplier?.mobileNumber || "",
      });
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 flex items-center gap-2">
            <UserRound size={20} />
            <h6 className="text-lg font-semibold">Supplier Details</h6>
          </div>
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 flex items-center gap-3">
            <Button type="reset" variant={"outline"} onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" isLoading={createLoading || updateLoading}>
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default SupplierDetailsForm;
