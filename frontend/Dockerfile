# Usa una imagen base de Node.js
FROM  node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package.json ./

# Instala las dependencias
RUN npm install 


# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación de Next.js para producción
RUN npm run build

# Expone el puerto en el que correrá la aplicación
EXPOSE 80

# Comando para ejecutar la aplicación
CMD ["npm", "start"]