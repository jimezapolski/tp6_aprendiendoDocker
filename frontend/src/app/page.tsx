// page.tsx
"use client";

import React from "react";
import GridProfile from "@/components/gridProfile";
import Form from "@/components/form";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mt-16 mb-8 sm:mt-12 sm:mb-6 md:mt-20 md:mb-10">Hola stalker!</h1>
      <Form />
      <div className="max-w-full mt-4">
        <GridProfile />
      </div>
    </div>
  );
};

export default HomePage;
