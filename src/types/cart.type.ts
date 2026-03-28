export interface cartI {
  status: string;
  message: string;
  numOfCartItems: number;
  data: cartDataI;
  cartId:string
}

export interface cartDataI {
  _id: string;
  cartOwner: string;
  products: cartProductI[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface cartProductI {
  _id: string;
  count: number;
  price: number;
  product: productI;
}

export interface productI {
  _id: string;
  id: string;
  title: string;
  slug: string;
  imageCover: string;
  quantity: number;
  price: number;
  ratingsAverage: number;
  brand: brandI;
  category: categoryI;
  subcategory: subcategoryI[];
}

export interface brandI {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface categoryI {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface subcategoryI {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ShippDataI{
 shippingAddress: {
        details: string,
        phone: string,
        city: string,
        postalCode: string,
      },
}