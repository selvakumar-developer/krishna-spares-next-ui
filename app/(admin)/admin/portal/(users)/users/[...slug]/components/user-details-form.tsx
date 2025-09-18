"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  CreateUserInput,
  useCreateUser,
} from "@/gql/admin/api/users/useCreateUser";
import { User } from "@/gql/admin/api/users/users";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AddressDetailsForm from "./address-details-form";
import PersonalDetailsForm from "./personal-details-form";

const formSchema = z.object({
  // Personal Details
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  profilePicture: z
    .instanceof(FileList)
    .refine((files) => {
      if (!files || files.length === 0) return true; // Optional field
      return files.length === 1;
    }, "Please select only one file")
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

  // Address Details
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
  country: z.string().min(1, "Country is required"),
});

type FormData = z.infer<typeof formSchema>;

interface UserDetailsFormProps {
  user?: User;
}

function UserDetailsForm({ user }: UserDetailsFormProps) {
  const { back } = useRouter();
  const { slug } = useParams<{ slug: string[] }>();
  const isEditMode = slug && slug[0] === "edit";

  const { createUser, loading } = useCreateUser();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
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
      const createUserInput: CreateUserInput = {
        fullName: `${values.firstName} ${values.lastName}`,
        email: values.email,
        mobileNumber: values.phone,
        password: values.email,
        profilePicture: values.profilePicture[0],
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          postalCode: values.zipCode,
          country: values.country,
        },
      };

      const result = await createUser(createUserInput);

      if (result) {
        toast({
          title: "Success",
          description: "User created successfully",
        });
        back();
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create user. Please try again.",
      });
      // Handle error (e.g., show toast notification)
    }
    // Handle form submission
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
            <Button type="submit" isLoading={loading}>
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default UserDetailsForm;
