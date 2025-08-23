interface User {
  email: string;
  address: Address[];
  createdAt: string; // ISO date string
  fullName: string;
  isDeleted: boolean;
  mobileNumber: string;
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
