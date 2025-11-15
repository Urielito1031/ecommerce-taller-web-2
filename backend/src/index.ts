import express from 'express';
import 'dotenv/config';
import './config/prisma';
import cors from 'cors';

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import productoRoutes from './routes/producto.routes';
import carritoRoutes from './routes/carrito.routes';
import categoriaRoutes from './routes/categoria.routes';


const app = express();
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.disable('x-powered-by');
app.use(cors({
    origin: 'http://localhost:4200',
}))
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/producto', productoRoutes);
app.use('/api/carrito', carritoRoutes);


const PORT = process.env.PORT || 3000;





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


