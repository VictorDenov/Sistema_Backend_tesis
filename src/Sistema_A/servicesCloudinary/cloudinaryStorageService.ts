import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';  // Necesario si sigues usando multer
import * as dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

@Injectable()
export class CloudinaryStorageService {
  static storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,  // Usar la versión 2 de Cloudinary
    params: (req, file) => {  // Función dinámica para establecer la carpeta
      const folder = req.body.folder || (req.body.isbn ? 'libros' : 'categorias'); // Determina la carpeta: 'libros' o 'categorias'
      return {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Usar la variable de entorno
        api_key: process.env.CLOUDINARY_API_KEY,        // Usar la variable de entorno
        api_secret: process.env.CLOUDINARY_API_SECRET,  // Usar la variable de entorno
        folder: folder,                                 // Se usa el valor de 'folder' dinámico
        allowed_formats: ['jpg', 'jpeg', 'png'],        // Tipos de archivo permitidos
      };
    }
  });




  
}
