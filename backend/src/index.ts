import express from 'express';
import 'dotenv/config';
import './config/prisma';
import cors from 'cors';

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";


const app = express();
app.use(express.json());
app.disable('x-powered-by');
app.use(cors({
    origin: 'http://localhost:4200',
}))
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


