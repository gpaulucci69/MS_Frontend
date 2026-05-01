# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx Stage
FROM nginx:alpine
# Copiamos nuestra config personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf 
# Copiamos los archivos compilados
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]