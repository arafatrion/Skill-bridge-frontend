export interface ITutor {
  id: string;
  name: string;
  image?: string;
  specialty?: string;
  price?: number;
  subjects?: string[];
  bio?: string;
  role: string;
}