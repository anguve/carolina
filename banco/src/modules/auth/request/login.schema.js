import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('El correo electrónico no es válido')
    .max(100, 'El correo electrónico no puede tener más de 100 caracteres')
    .required('El correo electrónico es obligatorio'),

  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede tener más de 100 caracteres')
    .required('La contraseña es obligatoria')
});
