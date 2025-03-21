export type UserType = {
  email: string;
  _id: string;
  image: string;
  username: string;
  password: string;
  listings: ListingType[];
  favourites: string[];
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

export type ChatType = {
  buyerId: string;
  created_at: string;
  listing: ChatListingType;
  messages: MessageType[];
  sellerId: string;
  updatedAt: string;
  _id: string;
};

export type MessageType = {
  sender: SenderType;
  text: string;
  _id: string;
};

export type SenderType = {
  username: string;
  _id: string;
};

export type ChatListingType = {
  name: string;
  _id: string;
};
