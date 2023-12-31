type DefaultProps = {
  customClass?: string;
};

const customClassDefaultProps = {
  customClass: "",
} as DefaultProps;

export interface Login {
  username: string;
  password: string;
}

export interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export type fields = {
  [key: string]: string | number;
};

export type Question = {
  question: string;
  rating: number | null;
};

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};

interface Internship {
  id: number;
  title: string;
  description: string;
  photoUrl: string;
  documentUrl: string;
  deadline: Date;
  duration: number;
  durationUnit: string;
  applications: number;
  department: string;
  startDate: Date;
  created: Date;
}
