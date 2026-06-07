import * as UsuarioModel from '../models/usuario.model.js';
import bcrypt from 'bcrypt';

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.getAllUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const usuario = await UsuarioModel.getUsuarioById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.contrasena) {
      data.contrasena = await bcrypt.hash(data.contrasena, 10);
    }
    const nuevo = await UsuarioModel.createUsuario(data);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.contrasena) {
      data.contrasena = await bcrypt.hash(data.contrasena, 10);
    }
    const actualizado = await UsuarioModel.updateUsuario(req.params.id, data);
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const resultado = await UsuarioModel.deleteUsuario(req.params.id);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
