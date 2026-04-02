import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true, index: true },
  turno: {
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    motivo: { type: String, required: true }
  },
  creadoEn: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);