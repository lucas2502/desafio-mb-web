// src/app.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { routes } from './routes/routes.js'; // ou o nome correto do seu arquivo de rotas

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../../ui/dist/index.html")));
app.use("/api", routes);

export default app;
