import React, { useEffect, useState } from "react";
import {
  getLatestImageUrlByProfile,
  getProfile,
  borrarPerfil,
} from "../app/utils";
import { ResultadoPerfil, perfilNoEncontrado } from "@/app/modelo";
import Image from "next/image";
import Link from "next/link";

export interface CardProps {
  profileId: number;
}

const CardProfile: React.FC<CardProps> = ({ profileId }) => {
  const [url, setUrl] = useState<string>(); 
  const [profile, setProfile] = useState<ResultadoPerfil>(perfilNoEncontrado);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageUrl = await getLatestImageUrlByProfile(profileId);
        setUrl(imageUrl);

        const fetchedProfile = await getProfile(profileId);
        setProfile(fetchedProfile);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [profileId]);

  const handleDelete = async () => {
    try {
      await borrarPerfil({ id: profileId });
      window.location.reload(); // Recargar la página después de la eliminación
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center mt-8">
      <div className="m-4 mt-0 relative">
        <div className=" hover:bg-teal-900 hover:text-white font-bold  border-2 bg-white text-gray-900 hover:border-white border-gray-500 shadow-md rounded-xl pt-12 p-8 relative">
          {profile.tipo === "exito" ? (
            <>
              <Link href={`/${profileId}`}>
                <p className="max-w-xs mb-2">{profile.encontrado.nombre}</p>
                {url ? (
                  <div className="relative w-48 h-48 overflow-hidden rounded-xl">
                    <Image
                      src={url} // Utiliza la URL obtenida y almacenada en el estado
                      layout="fill"
                      objectFit="cover"
                      alt="Profile"
                    />
                  </div>
                ) : (
                  <div>Cargando imagen...</div>
                )}
              </Link>
              <button
                onClick={handleDelete}
                className="absolute top-2 right-2 textgray-900 rounded-full p-2 focus:outline-none hover:text-white hover:bg-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </>
          ) : (
            <div>Cargando perfil...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
