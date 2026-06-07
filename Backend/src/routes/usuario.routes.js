import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from '../controllers/usuario.controller.js';

const router = express.Router();
router.use(verifyToken);

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;
