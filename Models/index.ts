export interface IReview {
  name: string;
  review: string;
  rating: number;
  createdAt: string; //": "2022-07-19T15:44:02.454Z",
}
export interface IProduct {
  createdAt: string; //": "2022-07-19T15:44:02.454Z",
  name: string; //": "Modern Steel Soap",
  image: string; //": "http://loremflickr.com/640/480/fashion",
  oldPrice: number; //": "548.00",
  price: number; //": "475.00",
  department: string; //": "Movies",
  product: string; //": "Hat",
  material: string; //": "Plastic",
  description: string; //": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
  adjective: string; //": "Fantastic",
  color: string; //": "white",
  tags: Array<string>; //": [],
  reiews: Array<IReview>; //": [],
  relatedProducts: string; //": [],
  id: string; //": "1",
  images: Array<string>; //": []
}
export interface ICartProduct {
  createdAt: string; //": "2022-07-19T15:44:02.454Z",
  name: string; //": "Modern Steel Soap",
  image: string; //": "http://loremflickr.com/640/480/fashion",
  quantity: number; //": "548.00",
  product_id: string; //": "1",
  id: string; //": "1",
  price: number; //": "475.00",

}

