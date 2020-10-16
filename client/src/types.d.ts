declare module "*.css";

type RegisterPageState = {
  firstName: string;
  lastName: string;
  email: string;
  VisitorType: string;
  StudentID?: string;
  DateOfBirth: string;
  agreeToTerms: boolean;
};

type ItemType = {
  itemName: string;
  selected?: boolean;
};

type ToggleItem = (item: ItemType) => void;

type HandleItemSubmit = (e: FormEvent<HTMLButtonElement>) => void;

type UserLoginInfo = {
  email: string;
  userId: string;
};

type Query = {
  query_name: string;
  query_sql: string;
};
