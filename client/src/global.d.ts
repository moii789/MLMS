declare module "*.css";

type RegisterPageState = {
  firstName: string;
  lastName: string;
  email: string;
  VisitorType: string;
  StudentID?: string;
  agreeToTerms: boolean;
};
