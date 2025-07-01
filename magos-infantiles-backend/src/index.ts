import express from 'express';
import magosRoutes from './routes/magos';
import noticiasRoutes from './routes/noticias';
import contactoRoutes from './routes/contacto';

const app = express();
app.use(express.json());

// Rutas
app.use('/api/magos', magosRoutes);
app.use('/api/noticias', noticiasRoutes);
app.use('/api/contacto', contactoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
}); 