export interface JwtPayload {
    sub: string; // Usuario ID
    username: string; // Nombre de usuario
    role:string;
    // Agrega cualquier otra información que desees incluir en el token JWT
  }