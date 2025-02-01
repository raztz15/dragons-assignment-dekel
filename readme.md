# Pizza App

\*todo - what the app about ?

- must download daemon to communicate with linux containers - [docker desktop](https://www.docker.com/products/docker-desktop)

- must download pnpm to run the code

sh
    # Install pnpm global
    npm install -g pnpm


### Installation + Running The Application

1. Clone the repository to your local machine + run docker-compose:

   sh
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
   

2. Inject initial data to mongo and run locally:

   sh
   # open terminal then go to server
   cd server

   # Install dependencies
   pnpm install

   # inject the data
   pnpm run migrate-mongo:up

   # run the server
   pnpm run dev
   

3. run frontend app:

   sh
   # go back to client folder
   cd ../client

   # Install dependencies
   pnpm install

   # run the client
   pnpm run dev
   
