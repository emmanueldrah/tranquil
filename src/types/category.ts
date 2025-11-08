export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
}

export interface CategoryWithProducts extends Category {
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
}
