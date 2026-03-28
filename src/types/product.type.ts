export interface productI {
  brand: brandI;

  category: brandI;

  createdAt: string;
  description: string;
  id: string;
  imageCover: string;
  images: string[];

  price: number;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  slug: string;
  sold: number;
  subcategory: brandI[];
  title: string;
  updatedAt: string;
  _id: string;
}

interface brandI {
  image: string;
  name: string;
  slug: string;
  _id: string;
}
