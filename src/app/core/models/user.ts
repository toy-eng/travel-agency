export interface UserAddress {
  street: string;
  neighbourhood: string | null;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // "pendingEmail": null,
  phone: string;
  // "avatarUrl": "https://cdn.golobe.com/avatars/john.jpg",
  dateOfBirth: string;
  address: UserAddress;
  // emailVerified: true,
}