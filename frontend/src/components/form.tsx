import React, { useState } from "react";
import { agregarPerfil, AgregarPerfilRespuesta } from "../app/utils";

const Form: React.FC = () => {
  const [nombrePerfil, setNombrePerfil] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombrePerfil(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const respuesta: AgregarPerfilRespuesta = await agregarPerfil({
        nombre: nombrePerfil,
      });
      setMensaje(respuesta.mensaje);
      setNombrePerfil(""); 
      window.location.reload(); 
    } catch (error) {
      setMensaje("Error agregando perfil");
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-lg w-full shadow-md rounded-lg overflow-hidden p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-row items-center">
          <label
            htmlFor="nombrePerfil"
            className="place-content-center text-center text-base text-white flex-1"
          >
            Escribí el username de la persona a la querés stalkear ;)
          </label>
        </div>
        <div className="flex flex-row items-center mt-2">
          <div className="text-white text-2xl">@</div>
          <input
            type="text"
            id="nombrePerfil"
            value={nombrePerfil}
            onChange={handleInputChange}
            placeholder="nombreusuario"
            className="form-input ml-2 text-xl text-white bg-gray-900 border-2 rounded-full w-10 pl-3 mr-6 flex-1 py-2 border-gray-400 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="text-xl font-semibold bg-teal-600 hover:bg-teal-800 text-white py-2 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Agregar Perfil
          </button>
        </div>
      </form>
      {mensaje && <p className="text-sm mt-4 text-gray-600">{mensaje}</p>}
    </div>
  );
};

export default Form;
