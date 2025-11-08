import express from 'express';
import 'dotenv/config';
import './config/prisma';
import cors from 'cors';

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { productoController } from './controllers/producto.controller';
import productoRoutes from './routes/producto.routes';


const app = express();
app.use(express.json());
app.disable('x-powered-by');
app.use(cors({
    origin: 'http://localhost:4200',
}))
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/producto', productoRoutes);

const PORT = process.env.PORT || 3000;





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


