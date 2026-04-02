import mongoose from 'mongoose';
const { Schema } = mongoose;

const TurnoSchema = new Schema({}, { strict: false, timestamps: true });

export default mongoose.model('Turno', TurnoSchema, 'turnos');