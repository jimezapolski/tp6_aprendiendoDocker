import {
  Perfil,
  Imagen,
  ResultadoPerfil,
  perfilNoEncontrado,
  perfilEncontrado,
} from "./modelo";

export async function api<T>(url: string): Promise<T> {
  const urlCompleta = `http://18.219.239.1${url}`;
  console.log(urlCompleta);
  const response = await fetch(urlCompleta);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await (response.json() as Promise<T>);
}

export interface AgregarPerfilParams {
  nombre: string;
}
export interface AgregarPerfilRespuesta {
  mensaje: string;
}

export async function agregarPerfil(
  params: AgregarPerfilParams
): Promise<AgregarPerfilRespuesta> {
  const response = await fetch(
    `http://18.219.239.1/perfil/agregar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    return { mensaje: `Error agregando perfil: ${body}` };
  } else {
    const perfil = await (response.json() as Promise<Perfil>);
    return { mensaje: `Perfil ${perfil.nombre} agregado con éxito!` };
  }
}

export interface BorrarPerfilParams {
  id: number;
}
export interface BorrarPerfilRespuesta {
  mensaje: string;
}

export async function borrarPerfil(
  params: BorrarPerfilParams
): Promise<BorrarPerfilRespuesta> {
  const response = await fetch(
    `http://18.219.239.1/perfil/borrar`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    return { mensaje: `Error borrando perfil: ${body}` };
  } else {
    return { mensaje: `Perfil con ID ${params.id} borrado con éxito!` };
  }
}

export const getImagesIdByProfile = async (
  profileId: number
): Promise<Imagen[]> => {
  return api<Imagen[]>(`/imagenesPorPerfil/${profileId}`);
};

export const getProfiles = async (): Promise<Perfil[]> => {
  return api<Perfil[]>("/perfil");
};

export const getProfile = async (profileId: number): Promise<ResultadoPerfil> => {
  try {
    const profiles = await getProfiles();
    const profile = profiles.find((p) => p.id === profileId);
    if (profile) {
      return perfilEncontrado(profile);
    } else {
      return perfilNoEncontrado; 
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error; 
  }
};


export const getImagesUrlByProfile = async (
  profileId: number
): Promise<string[]> => {
  const images: Imagen[] = await getImagesIdByProfile(profileId);
  return images.map((i) => `http://18.219.239.1/imagen/${i.id}`);
};

export const getLatestImageUrlByProfile = async (profileId: number): Promise<string> => {
  try {
    const urls = await getImagesUrlByProfile(profileId);
    if (urls.length > 0) {
      return urls[urls.length - 1]; // Devuelve la última URL del array de imágenes
    } else {
      throw new Error("No images found for the given profile"); // Lanza un error si no se encuentran imágenes
    }
  } catch (error) {
    console.error("Error fetching latest image URL:", error);
    throw error; // Propaga el error para manejarlo en el componente que llama a getLatestImageUrlByProfile
  }
};

