export type TRegisterFormValues = {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  profilePhoto: string;
};

export type TLoginFormValues = {
  email: string;
  password: string;
};

export type TTokenUser = {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  role: string;
  status: string;
  iat: number;
  exp: number;
  profilePhoto: string;
};
