import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Usar la variable de entorno
  api_key: process.env.CLOUDINARY_API_KEY,        // Usar la variable de entorno
  api_secret: process.env.CLOUDINARY_API_SECRET,  // Usar la variable de entorno
});
