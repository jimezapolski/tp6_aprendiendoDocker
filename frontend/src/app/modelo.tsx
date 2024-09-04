export interface Usuario {
  nombre: string;
  clave: string;
  email: string;
}
export interface Perfil {
  id: number;
  nombre: string;
  idUltimaPublicacion: string;
}
export interface Imagen {
  id: number;
  Perfil: number;
}

// export type Url = string;

export type Resultado<T> =
  | { tipo: "exito"; encontrado: T }
  | { tipo: "no_encontrado" };

export type ResultadoPerfil = Resultado<Perfil>;
export function perfilEncontrado(encontrado: Perfil): ResultadoPerfil {
  return { tipo: "exito", encontrado };
}
export const perfilNoEncontrado: ResultadoPerfil = { tipo: "no_encontrado" };
