"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  CreateUserInput,
  useCreateUser,
} from "@/gql/admin/api/users/useCreateUser";
import { useUpdateUser } from "@/gql/admin/api/users/useUpdateUser";
import { User } from "@/gql/admin/api/users/users";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AddressDetailsForm from "./address-details-form";
import PersonalDetailsForm from "./personal-details-form";

const createProfilePictureSchema = z
  .instanceof(FileList)
  .refine(
    (files) => files && files.length === 1,
    "Profile picture is required for new users"
  )
  .refine((files) => {
    const file = files[0];
    return file.size <= 5 * 1024 * 1024; // 5MB limit
  }, "File size must be less than 5MB")
  .refine((files) => {
    const file = files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    return allowedTypes.includes(file.type);
  }, "Only JPEG, PNG, GIF, and WebP images are allowed");

const updateProfilePictureSchema = z.union([
  z.undefined(),
  z
    .instanceof(FileList)
    .refine(
      (files) => !files || files.length === 0 || files.length === 1,
      "Please select only one file"
    )
    .refine((files) => {
      if (!files || files.length === 0) return true;
      const file = files[0];
      return file.size <= 5 * 1024 * 1024; // 5MB limit
    }, "File size must be less than 5MB")
    .refine((files) => {
      if (!files || files.length === 0) return true;
      const file = files[0];
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      return allowedTypes.includes(file.type);
    }, "Only JPEG, PNG, GIF, and WebP images are allowed"),
]);

const getFormSchema = (isEditMode: boolean) =>
  z.object({
    // Personal Details
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    profilePicture: isEditMode
      ? updateProfilePictureSchema
      : createProfilePictureSchema,

    // Address Details
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
    country: z.string().min(1, "Country is required"),
  });

type FormData = z.infer<ReturnType<typeof getFormSchema>>;

interface UserDetailsFormProps {
  user?: User;
}

function UserDetailsForm({ user }: UserDetailsFormProps) {
  const { back } = useRouter();
  const { slug } = useParams<{ slug: string[] }>();
  const isEditMode = slug && slug[0] === "edit";

  const { createUser, loading: createLoading } = useCreateUser();
  const { updateUser, loading: updateLoading } = useUpdateUser();

  const form = useForm<FormData>({
    resolver: zodResolver(getFormSchema(isEditMode)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profilePicture: undefined,
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      const baseUserInput = {
        fullName: `${values.firstName} ${values.lastName}`,
        email: values.email,
        mobileNumber: values.phone,
        password: values.email,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          postalCode: values.zipCode,
          country: values.country,
        },
      };

      let result;
      if (isEditMode) {
        const updateUserInput = {
          id: user?._id as string,
          ...baseUserInput,
          profilePicture: values.profilePicture?.[0],
          keepExistingImage: !values.profilePicture?.length,
        };
        result = await updateUser(updateUserInput);
      } else {
        const createUserInput: CreateUserInput = {
          ...baseUserInput,
          profilePicture: (values.profilePicture as FileList)[0], // Safe to assert since validation ensures it exists
        };
        result = await createUser(createUserInput);
      }

      if (result) {
        toast({
          title: "Success",
          description: isEditMode
            ? "User updated successfully"
            : "User created successfully",
        });
        back();
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: isEditMode
          ? "Failed to update user. Please try again."
          : "Failed to create user. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    back();
  };

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user?.fullName.split(" ")[0] || "",
        lastName: user?.fullName.split(" ")[1] || "",
        email: user?.email || "",
        phone: user?.mobileNumber || "",
        street: user?.address?.[0].street || "",
        city: user?.address?.[0].city || "",
        state: user?.address?.[0].state || "",
        zipCode: user?.address?.[0].postalCode || "",
        country: user?.address?.[0].country || "",
      });
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12">
            <PersonalDetailsForm
              form={form}
              existingProfilePictureUrl={user?.profilePicture?.url}
              isEditMode={isEditMode}
            />
          </div>
          <div className="col-span-12">
            <AddressDetailsForm form={form} />
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

export default UserDetailsForm;
