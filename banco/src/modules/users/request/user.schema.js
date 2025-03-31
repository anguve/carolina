import * as yup from 'yup';

export const userSchema = yup.object({
  name: yup
    .string()
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .required('El nombre es obligatorio'),

  email: yup
    .string()
    .email('El correo electrónico no es válido')
    .max(50, 'El correo electrónico no puede tener más de 50 caracteres')
    .required('El correo electrónico es obligatorio'),

  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(20, 'La contraseña no puede tener más de 20 caracteres')
    .required('La contraseña es obligatoria'),

  role: yup
    .string()
    .oneOf(['Administrador', 'Asesor'], 'Rol no válido')
    .required('El tipo de usuario es obligatorio')
});
