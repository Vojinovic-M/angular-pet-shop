export interface Order {
  id: number;
  status: string;
  pet: {
    id: number;
    name: string;
    description: string;
    breed: string;
    age: number;
    size: number;
    origin: string;
    price: number;
    imageUrl: string;
  };
  price: number;
  createdAt: Date;
  rating: number;
}
