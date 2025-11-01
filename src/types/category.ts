export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: string[];
}

export interface CategoryWithProducts extends Category {
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
}