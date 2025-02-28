export type UserType = {
  email: string;
  id: string;
  image: string;
  username: string;
};

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
  user: UserType;
};

export type ListingType = {
  _id: string;
  name: string;
  description: string;
  location: LocationType;
  category: string;
  likes: number;
};

export type LocationType = {
  city: string;
  district: string;
};
