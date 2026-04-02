import 'dotenv/config';
import mongoose from 'mongoose';   
import { createBot } from '@builderbot/bot';
import { MemoryDB as Database } from '@builderbot/bot'; 
import templates from './templates/index.js';
import { providerMeta, providerBaileys } from './provider/index.js';
import { config } from './config/index.js';
 
const PORT = config.PORT;  

const connectDB = async () => { 
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('❌ No se encontró la variable MONGO_URI en el archivo .env');
    }

     await mongoose.connect(uri);

    console.log('✅ Conectado correctamente a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
  }
};
 

const main = async () => {
  await connectDB();

  const adapterFlow = templates;
  let adapterProvider;

  if (config.provider === 'meta') {
    adapterProvider = providerMeta;
  } else if (config.provider === 'baileys') {
    adapterProvider = providerBaileys;
  } else {
    console.log('ERROR: Falta agregar un provider al .env');
  }

  const adapterDB = new Database();

  const { httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
 
  httpServer(+PORT);
  console.log(`🤖 Bot odontológico iniciado en el puerto ${PORT}`);
};
 
main();     
 