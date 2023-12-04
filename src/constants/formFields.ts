export const loginFields = [
  {
    labelText: "Email",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Enter email",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Enter password",
  },
];

export const resetPasswordField = {
  name: "email",
  type: "email",
  placeholder: "Email Address",
  isRequired: true,
};

export const passwordFields = [
  {
    labelText: "Current Password",
    labelFor: "current-password",
    id: "currentPassword",
    name: "currentPassword",
    type: "password",
    autoComplete: "currentPassword",
    isRequired: true,
    placeholder: "Enter your current password",
  },
  {
    labelText: "New Password",
    labelFor: "newPassword",
    id: "newPassword",
    name: "newPassword",
    type: "password",
    autoComplete: "newPassword",
    isRequired: true,
    placeholder: "Enter new password",
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirm-password",
    id: "confirmPassword",
    name: "confirmPassword",
    type: "password",
    autoComplete: "confirmPassword",
    isRequired: true,
    placeholder: "Re-enter the new password",
  },
];

export const profileFields = [
  {
    labelText: "First Name",
    labelFor: "first-name",
    id: "firstname",
    name: "firstName",
    type: "text",
    autoComplete: "firstname",
    isRequired: true,
    placeholder: "Enter your First Name",
  },
  {
    labelText: "Last Name",
    labelFor: "lastname",
    id: "lastname",
    name: "lastName",
    type: "text",
    autoComplete: "lastname",
    isRequired: true,
    placeholder: "Enter your Last Name",
  },
  {
    labelText: "Email",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: false,
    placeholder: "Enter your email",
  },

  {
    labelText: "Telephone",
    labelFor: "telephone",
    id: "phoneNumber",
    name: "phoneNumber",
    type: "phone",
    autoComplete: "telephone",
    isRequired: false,
    placeholder: "Your Telephone Number",
  },
];

export const userFields = [
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
    isRequired: true,
    placeholder: "Telephone",
  },
];


export const donorFields = [...userFields, {}];