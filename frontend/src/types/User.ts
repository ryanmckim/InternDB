export type User = {
  verified?: boolean;
  id?: number;
  email?: string;
  role?: "user" | "admin";
  createdOn?: Date;
  reviews?: any[];
};
