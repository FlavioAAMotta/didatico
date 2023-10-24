#!/bin/bash

echo "Digite o nome do projeto:"
read project_name
mkdir $project_name
cd $project_name

npm init -y
npm install express knex mysql cors dotenv
npm install typescript ts-node-dev @types/node @types/express @types/cors --save-dev

cat > tsconfig.json <<EOL
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "rootDir": "./src",
    "sourceMap": true,
    "outDir": "./build",
    "removeComments": true,
    "esModuleInterop": true,
    "noImplicitAny": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
EOL

mkdir src
touch src/index.ts

cat > src/connection.ts <<EOL
import knex from 'knex';

const connection = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true
    }
})

export default connection;
EOL

cat > src/index.ts <<EOL
import 'dotenv/config';
import express, { Request, Response } from "express";
import cors from "cors";

import { AddressInfo } from "net";
import connection from "./connection";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  try {
    res.send("Hello, world!");
  } catch (e: any) {
    res.send(e.sqlMessage || e.message);
  }
});

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(\`Server is running in http://localhost:\${address.port}\`);
  } else {
    console.error(\`Failure upon starting server.\`);
  }
});
EOL

cat > .gitignore <<EOL
node_modules/
build/
.DS_Store
.env
EOL

cat > .env <<EOL
PORT=3003
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
EOL

sed -i '/"scripts": {/a \  "dev": "tsnd src/index.ts",' package.json
echo "Projeto criado com sucesso!"
