// cardImage.tsx
import React from "react";
import Image from "next/image";

interface CardProps {
  url: string;
  onClick: () => void; // Nuevo prop para manejar el clic
}

const CardImage: React.FC<CardProps> = ({ url, onClick }) => {
  return (
    <div
      className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 cursor-pointer"
      onClick={onClick} // Manejador de clic para abrir la imagen en grande
    >
      <Image
        src={url}
        alt={`Image`}
        width={500}
        height={500}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default CardImage;
