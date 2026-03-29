# Step 1: Build
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Step 2: Serve
FROM node:20

WORKDIR /app

RUN npm install -g serve

COPY --from=0 /app/dist /app/dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]