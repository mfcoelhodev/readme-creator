FROM node:22-alpine

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

# Instalando dependencias
RUN npm ci

# Copiando o restante do diretório
COPY . .

# porta default para o frontend
EXPOSE 5173

CMD ["npm", "run", "dev"]