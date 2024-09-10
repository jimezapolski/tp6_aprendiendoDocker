# Usa una imagen base de Node.js
FROM node:20

# Instala TypeScript y otras herramientas necesarias
RUN npm install -g typescript

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que correrá la aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["node", "src/index.ts"]