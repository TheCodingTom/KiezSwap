export type UserType = {
  email: string;
  id: string;
  image: string;
  username: string;
  password: string;
  listings: ListingType[];
};

export type User = Omit<UserType, "password">;

export type UserRegisterFormType = {
  email: string;
  image?: string;
  password: string;
  username: string;
};

export type ImageUploadOkResponse = {
  message: string;
  imageURL: string;
};

export type RegisterOkResponse = {
  message: string;
  user: User;
};

export type LoginOkResponse = {
  message: string;
  user: User;
  token: string;
};

export type GetProfileOkResponse = {
  message: string;
  id: string;
  username: string;
  email: string;
  image: string;
};

export type ListingType = {
  _id: string;
  name: string;
  description: string;
  location?: LocationType;
  district: string;
  category?: string;
  likes?: number;
  image: string;
  seller: User;
};

export type NewListingType = {
  name: string;
  description: string;
  district: string;
};

export type LocationType = {
  city: string;
  district: string;
};

export type ListingFormType = Omit<ListingType, "_id">;
