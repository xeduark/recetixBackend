require('dotenv').config();

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const jwt = require('jsonwebtoken');

// Configuraciones de Firebase (debes asegurarte de que esté configurado correctamente usando variables de entorno)
const db = require('../config/firebase');

// Variables de entorno
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const GCLOUD_PROJECT = process.env.GCLOUD_PROJECT;
const GCLOUD_BUCKET = process.env.GCLOUD_BUCKET;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Validación de variables de entorno
if (!GOOGLE_APPLICATION_CREDENTIALS || !GCLOUD_PROJECT || !GCLOUD_BUCKET || !JWT_SECRET_KEY) {
  console.error("Variables de entorno no configuradas correctamente.");
  process.exit(1); // Detén la ejecución si falta alguna variable.
}

const storage = new Storage({
  projectId: GCLOUD_PROJECT
});

const bucket = storage.bucket(GCLOUD_BUCKET);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No autorizado' });

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};

const uploadImage = async (req, file, type, userId) => {
  const storagePath = `recetas/${type}/${userId}/${file.originalname}`;
  const fileUpload = bucket.file(storagePath);
  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on('error', (err) => reject(err));
    stream.on('finish', async () => {
      const [url] = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-09-2491', // Considera una fecha de expiración más realista
      });
      resolve(url);
    });
    stream.end(file.buffer);
  });
};


router.post('/', authenticateToken, upload.single('imagen'), async (req, res) => {
  const { descripcion, dificultad, name, tiempo, type } = req.body;
  const userId = req.user.uid;

  if (!name || !descripcion || !dificultad || !tiempo || !type) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    if (type !== 'vegetariana' && type !== 'novegetariana') {
      return res.status(400).json({ message: 'Tipo de receta inválido' });
    }

    const imageUrl = await uploadImage(req, req.file, type, userId);

    const recetaRef = await db.collection('recetas').add({
      descripcion,
      dificultad,
      imagen: imageUrl,
      name,
      tiempo,
      type,
      userId,
    });

    res.status(201).json({ message: 'Receta creada', id: recetaRef.id });
  } catch (error) {
    console.error('Error al crear receta:', error);
    res.status(500).json({ message: 'Error al crear receta' });
  }
});

router.get('/', async (req, res) => {
  try {
    const recetasSnapshot = await db.collection('recetas').get();
    const recetas = recetasSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(recetas);
  } catch (error) {
    console.error('Error al obtener recetas', error);
    res.status(500).json({ message: 'Error al obtener recetas' });
  }
});

router.get('/:id', async (req, res) => {
  const recetaId = req.params.id;

  try {
    const recetaDoc = await db.collection('recetas').doc(recetaId).get();
    if (!recetaDoc.exists) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    const receta = {
      id: recetaDoc.id,
      ...recetaDoc.data(),
    };

    res.status(200).json(receta);
  } catch (error) {
    console.error('Error al obtener la receta', error);
    res.status(500).json({ message: 'Error al obtener la receta' });
  }
});

router.get('/type/:type', async (req, res) => {
  const type = req.params.type.toLowerCase();

  try {
    const recetasSnapshot = await db.collection('recetas')
      .where('type', '==', type)
      .get();
    const recetas = recetasSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(recetas);
  } catch (error) {
    console.error('Error al obtener recetas', error);
    res.status(500).json({ message: 'Error al obtener recetas' });
  }
});


router.put('/:id', authenticateToken, upload.single('imagen'), async (req, res) => {
  const recetaId = req.params.id;
  const { descripcion, dificultad, name, tiempo, type } = req.body;
  const userId = req.user.uid;

  try {
    const recetaRef = db.collection('recetas').doc(recetaId);
    const recetaSnapshot = await recetaRef.get();
    if (!recetaSnapshot.exists) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    let imageUrl = recetaSnapshot.data().imagen;
    if (req.file) {
      imageUrl = await uploadImage(req, req.file, type, userId);
    }

    await recetaRef.update({
      descripcion,
      dificultad,
      imagen: imageUrl,
      name,
      tiempo,
      type,
    });

    res.status(200).json({ message: 'Receta actualizada' });
  } catch (error) {
    console.error('Error al actualizar receta:', error);
    res.status(500).json({ message: 'Error al actualizar receta' });
  }
});

router.delete('/:id', async (req, res) => {
  const recetaId = req.params.id;

  try {
    const recetaRef = db.collection('recetas').doc(recetaId);
    await recetaRef.delete();

    res.status(200).json({ message: 'Receta eliminada' });
  } catch (error) {
    console.error('Error al eliminar la receta', error);
    res.status(500).json({ message: 'Error al eliminar la receta' });
  }
});

module.exports = router;