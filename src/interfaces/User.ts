interface User {
  id: string;
  email: string;
  firstname: string | null;
  lastname: string | null;
  password: string;
  gender: string | null;
  telephone: string | null;
  role: string;
  isInviteAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
