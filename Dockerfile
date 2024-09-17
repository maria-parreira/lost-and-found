# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação vai usar
EXPOSE 3000

# Defina o comando para iniciar a aplicação
CMD ["npm", "start"]
