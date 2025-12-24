interface User {
  _id: string; // Unique identifier for the user
  email: string;
  address: Address[];
  createdAt: string; // ISO date string
  fullName: string;
  isDeleted: boolean;
  mobileNumber: string;
  updatedAt: string; // ISO date string
  profilePicture: ProfilePicture;
}

export interface ProfilePicture {
  url: string;
  _id: string;
  createdAt: string; // ISO date string
  filename: string;
  mimeType: string; // e.g., "image/jpeg"
  originalName: string;
  size: number; // in bytes
  updatedAt: string; // ISO date string
}
interface Address {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
}

export { Address, User };
