import { Rol } from "src/module/entities/rol.entity";

export interface AuthResponse {
    accessToken: string; // Token de acceso
    expiresIn: number; // Tiempo de expiración del token en segundos
    user: UserInfo; // Información del usuario autenticado
  }
  
  export interface UserInfo {
    userId: string; // ID del usuario
    username: string; // Nombre de usuario
    role: number; // Rol del usuario (por ejemplo, administrador, usuario, etc.)
    // Puedes agregar más campos de información del usuario según tus necesidades
  }
  
  export interface RegisterResponse {
    accessToken: string;
    expiresIn: number;
    user: {
        cedula: string;
        nombre: string;
        apellido: string;
        email: string;
        rol: string; // O el tipo correcto de acuerdo a la estructura de tu base de datos
    };
}
  