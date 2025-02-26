export type UserType = {
  username: string;
  email: string;
  password: string;
  image: string;
}

export type ImageUploadOkResponse = {
  message: string;
  imageURL: string;
}

export type ListingType = {
    _id: string;
    name: string;
    description: string;
    location: LocationType;
    category: string;
    likes: number
  };

  export type LocationType = {
    city: string;
    district: string;
  }