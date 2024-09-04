// page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ResultadoPerfil } from "@/app/modelo";
import { getProfile } from "../utils";
import Link from "next/link";
import GridImage from "@/components/gridImage";
import ArrowLeft from "../../components/arrowLeft"; 
import ModalImage from "@/components/modalImage"; 

const ProfilePage: React.FC<{ params: { profileId: string } }> = ({
  params,
}) => {
  const profileId = parseInt(params.profileId, 10);
  const [nombrePerfil, setNombrePerfil] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 

  useEffect(() => {
    const fetchProfileName = async () => {
      try {
        const resultadoPerfil: ResultadoPerfil = await getProfile(profileId);
        if (resultadoPerfil.tipo === "exito") {
          setNombrePerfil(resultadoPerfil.encontrado.nombre);
        } else {
          console.error("Perfil no encontrado");
        }
      } catch (error) {
        console.error("Error fetching profile name:", error);
      }
    };

    fetchProfileName();
  }, [profileId]);

  const handleOpenImage = (url: string) => {
    setSelectedImage(url);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="max-w-full">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-teal-500 text-xl flex items-center">
            <ArrowLeft className="h-6 w-6 mr-1" />
            <span className="group relative">
              Otros perfiles
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-teal-500 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Últimos posteos de @{nombrePerfil}
          </h1>
        </div>
        <div className="max-w-full mt-4">
          <GridImage profileId={profileId} handleOpenImage={handleOpenImage} />{" "}
        </div>
      </div>

      {selectedImage && (
        <ModalImage url={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ProfilePage;
