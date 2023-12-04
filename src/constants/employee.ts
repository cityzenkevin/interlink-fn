import { userFields } from "./formFields";

export const profileFields = [
  ...userFields,
  {
    labelText: "Job Title",
    labelFor: "job_title",
    name: "job_title",
    type: "text",
    isRequired: true,
    placeholder: "Job Title",
    id: "job_tile",
    autoComplete: "job_title",
  },
  {
    labelText: "Department",
    labelFor: "department",
    name: "department",
    type: "text",
    isRequired: true,
    placeholder: "Department",
    id: "department",
    autoComplete: "department",
  },
  {
    labelText: "Salary",
    labelFor: "salary",
    name: "salary",
    type: "number",
    isRequired: true,
    placeholder: "Salary",
    id: "salary",
    autoComplete: "salary",
  },
  {
    labelText: "Date of Birth",
    labelFor: "dob",
    name: "dob",
    type: "date",
    isRequired: true,
    placeholder: "Date of Birth",
    id: "dob",
    autoComplete: "dob",
  },
  {
    labelText: "Bank Name",
    labelFor: "bankName",
    name: "bankName",
    type: "text",
    isRequired: true,
    placeholder: "Bank Name",
    id: "bankName",
    autoComplete: "bankName",
  },
  {
    labelText: "Account Number",
    labelFor: "accountNumber",
    name: "accountNumber",
    type: "number",
    isRequired: true,
    placeholder: "Account Number",
    id: "accountNumber",
    autoComplete: "accountNumber",
  },
];

export const experienceFields = [
  {
    labelText: "Company Name",
    labelFor: "companyName",
    name: "companyName",
    type: "text",
    isRequired: true,
    placeholder: "Company Name",
    id: "companyName",
    autoComplete: "companyName",
  },
  {
    labelText: "Job Title",
    labelFor: "jobTitle",
    name: "jobTitle",
    type: "text",
    isRequired: true,
    placeholder: "Job Title",
    id: "jobTitle",
    autoComplete: "jobTitle",
  },
  {
    labelText: "Start Date",
    labelFor: "startDate",
    name: "startDate",
    type: "date",
    isRequired: true,
    placeholder: "Start Date",
    id: "startDate",
    autoComplete: "startDate",
  },
  {
    labelText: "End Date",
    labelFor: "endDate",
    name: "endDate",
    type: "date",
    isRequired: true,
    placeholder: "End Date",
    id: "endDate",
    autoComplete: "endDate",
  },
];

export const qualificationFields = [
  {
    labelText: "Institution Name",
    labelFor: "institution",
    name: "institution",
    type: "text",
    isRequired: true,
    placeholder: "Institution Name",
    id: "institution",
    autoComplete: "institution",
  },

  {
    labelText: "Completion Year",
    labelFor: "completionYear",
    name: "completionYear",
    type: "year",
    isRequired: true,
    placeholder: "Completion Year",
    id: "completionYear",
    autoComplete: "completionYear",
  },
];

export const leaveFields = [
  {
    labelText: "Start Date",
    labelFor: "start_date",
    name: "start_date",
    type: "date",
    isRequired: true,
    placeholder: "Start Date",
    id: "start_date",
    autoComplete: "start_date",
  },
  {
    labelText: "End Date",
    labelFor: "end_date",
    name: "end_date",
    type: "date",
    isRequired: true,
    placeholder: "End Date",
    id: "end_date",
    autoComplete: "end_date",
  },
];

export const editEmployeeFields = [
  {
    labelText: "First Name",
    labelFor: "firstname",
    id: "firstname",
    name: "firstname",
    type: "text",
    autoComplete: "given-name",
    isRequired: true,
    placeholder: "First Name",
  },
  {
    labelText: "Last Name",
    labelFor: "lastname",
    id: "lastname",
    name: "lastname",
    type: "text",
    autoComplete: "family-name",
    isRequired: true,
    placeholder: "Last Name",
  },

  {
    labelText: "Email",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email",
  },
  {
    labelText: "Telephone",
    labelFor: "telephone",
    id: "telephone",
    name: "telephone",
    type: "phone",
    autoComplete: "telephone",
    isRequired: false,
    placeholder: "Telephone",
  },
  {
    labelText: "Salary",
    labelFor: "salary",
    name: "salary",
    type: "number",
    isRequired: true,
    placeholder: "Salary",
    id: "salary",
    autoComplete: "salary",
  },
  {
    labelText: "Department",
    labelFor: "department",
    name: "department",
    type: "text",
    isRequired: false,
    placeholder: "Department",
    id: "department",
    autoComplete: "department",
  },
];


