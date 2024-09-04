// modalImage.tsx
import React from "react";
import Image from "next/image";

interface ModalProps {
  url: string;
  onClose: () => void;
}

const ModalImage: React.FC<ModalProps> = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative overflow-hidden rounded-lg shadow-lg max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-full p-2 focus:outline-none text-white bg-red-600 hover:bg-red-800"
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
              strokeWidth={3}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={url}
            alt={`Image`}
            width={800}
            height={800}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalImage;
