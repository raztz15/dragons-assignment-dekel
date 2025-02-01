# 🍕 Pizza Order Management System

- ### Real-Time Order Management: 
Automatically fetches and updates orders with polling every 5 seconds.
- ### Dynamic Sorting:
Sorting by order id, customer name, order time and total price and manage pagination.
- ### Order Status Updates:
Track order statuses through various stages: Received, Preparing, Ready, EnRoute, and Delivered.
- ### Performance Optimized:
Efficient handling of 300+ preloaded orders with optimized database queries and state management using Redux Toolkit.
- ### Interactive UI:
Built with React, TypeScript, and Material UI for a responsive and user-friendly interface.

- must download daemon to communicate with linux containers - [docker desktop](https://www.docker.com/products/docker-desktop)

- must download pnpm to run the code

```sh
    # Install pnpm global
    npm install -g pnpm
```

### Installation + Running The Application

1. Clone the repository to your local machine + run docker-compose:

   ```sh
   # clone the project
   git clone https://github.com/raztz15/dragons-assignment-dekel

   # open directory
   cd dragons-assignment-dekel

   # Stop containers
   docker-compose down

   # run docker-compose to pull mongo latest image and run the container
   docker-compose up -d --build

   # open vscode with the current project
   code .
   ```

2. Inject initial data to mongo and run locally:

   ```sh
   # open terminal then go to server
   cd server

   # Install dependencies
   pnpm install

   # inject the data
   pnpm run migrate-mongo:up

   # run the server
   pnpm run dev
   ```

3. run frontend app:

   ```sh
   # go back to client folder
   cd .././client

   # Install dependencies
   pnpm install

   # run the client
   pnpm run dev
   ```
