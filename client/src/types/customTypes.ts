export type UserType = {
  email: string;
  _id: string;
  image: string;
  username: string;
  password: string;
  listings: ListingType[];
};

export type User = Omit<UserType, "password">;

export type SellerType = {
  username: string;
  _id: string;
  email: string;
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
  _id: string;
  username: string;
  email: string;
  image: string;
  listings: ListingType[];
};

export type ListingType = {
  _id: string;
  name: string;
  description: string;
  district: string;
  category: string;
  likes?: number;
  image: string;
  seller: SellerType;
};
