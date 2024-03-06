export interface AuthResponse {
    accessToken: string; // Token de acceso
    expiresIn: number; // Tiempo de expiración del token en segundos
    user: UserInfo; // Información del usuario autenticado
  }
  
  export interface UserInfo {
    userId: string; // ID del usuario
    username: string; // Nombre de usuario
    role: string; // Rol del usuario (por ejemplo, administrador, usuario, etc.)
    // Puedes agregar más campos de información del usuario según tus necesidades
  }
  