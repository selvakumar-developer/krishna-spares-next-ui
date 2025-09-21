import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useImagePreview } from "@/hooks/useImagePreview";
import { UserRound, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface PersonalDetailsSectionProps {
  form: UseFormReturn<{
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: FileList;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }>;
  existingProfilePictureUrl: string | undefined;
  isEditMode: boolean;
}

function PersonalDetailsForm({
  form,
  existingProfilePictureUrl,
  isEditMode,
}: PersonalDetailsSectionProps) {
  const { previewUrl, createPreview, deleteImage, fileInputRef } =
    useImagePreview();
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(
    existingProfilePictureUrl || null
  );

  const handleImageDelete = (onChange: (value: any) => void) => {
    // Clear form field
    onChange(undefined);

    // Clear preview
    deleteImage(onChange);

    // Clear existing image URL for edit mode
    if (isEditMode) {
      setExistingImageUrl(null);
    }
  };

  const imageToShow = previewUrl || existingImageUrl;
  console.log("imageToShow: ", imageToShow);

  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-12 flex items-center gap-2">
        <UserRound size={20} />
        <h6 className="text-lg font-semibold">Personal Details</h6>
      </div>
      <div className="col-span-3">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-3">
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
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
      <div className="col-span-4">
        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field: { onChange, value, ...field } }) => {
            return (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const files = e.target.files;
                      onChange(files);
                      // Create preview
                      if (files && files.length > 0) {
                        createPreview(files[0]);
                      } else {
                        createPreview(null);
                      }
                    }}
                    className="file:mr-4  file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                </FormControl>
                <FormMessage />
                {/* Image Preview with Next.js Image */}
                {imageToShow && (
                  <div className="mt-4">
                    <div className="relative w-32 h-32 rounded-md overflow-hidden border bg-muted group">
                      <Image
                        src={imageToShow}
                        alt="Profile preview"
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageDelete(onChange)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    {/* File Info - only show for new uploads */}
                    {value && value.length > 0 && (
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="text-sm font-medium">{value[0].name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(value[0].size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    )}
                    {/* Existing image indicator */}
                    {isEditMode && existingImageUrl && !previewUrl && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          Current profile picture
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </FormItem>
            );
          }}
        />
      </div>
    </div>
  );
}

export default PersonalDetailsForm;
