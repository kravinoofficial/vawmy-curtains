export interface Collection {
  id: string;
  name: string;
  description: string;
  cover_image: string;
  images: string[];
}

export interface ContactInfo {
  id: number;
  email: string;
  phone: string;
  address: string;
  hours: string;
}
