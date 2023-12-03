export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: number | null;
    state: string;
    district: string;
    isTaluka: boolean | null;
    qualification: string;
    captcha: {
      operand1: number;
      operand2: number;
      answer: number;
      userAnswer: string;
    };
  }

export interface InputData {
    placeholder: string;
    name: string;
    type: string | number | any;
}

export interface InputDataProps {
    data: InputData[];
}

export const firstName: InputData = {
    placeholder: 'First Name',
    name: 'firstName',
    type: 'string'
}

export const lastName: InputData = {
    placeholder: 'Last name',
    name: 'lastName',
    type: 'string'
}

export const email: InputData = {
    placeholder: 'Email',
    name: 'email',
    type: 'email'
}


export const mobileNumber: InputData = {
    placeholder: "What's app mobile number",
    name: 'mobileNumber',
    type: 'number'
}

export const qualification:string[]=['10th','12th','B.Tech','M.Tech','MCA','MBA','Phd'];

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export type Errors = {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    state: string;
    email: string;
    qualification: string;
    isTaluka:string;
    captcha:string
  };


