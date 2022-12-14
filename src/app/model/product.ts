export class Product {
  id!: string;
  name!: string;
  description!: string;
  categoryId!: string;
  brandId!: string;
  options!: [
    {
      id: string,
      colorId: string,
      price: string,
      qty: string,
      sizeId: string,
      image: string,
    }
  ]
}

