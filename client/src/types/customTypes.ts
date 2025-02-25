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