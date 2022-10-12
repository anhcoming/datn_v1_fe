export class Product {
  product?: {
    id: string,
    name: string,
    status: number,
    category: {
      id: string,
      name: string,
      address: string,
      status: number
    },
    brand: {
      id: string,
      name: string,
      address: string,
      status: number
    }
  };

  color?: {
    id: string,
    color: string,
    status: number
  };

  size?: {
    id: string,
    size: string,
    status: number
  };

  name?: string

  price?: string

  quantity?: number

  image?: string

  createDate?: string

  description?: string

}
