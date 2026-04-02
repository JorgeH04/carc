import "dotenv/config";

export const config = {
    // Agregar todas las variables de entorno
    PORT: process.env.PORT || 3008,
    provider: process.env.provider,

    // OpenAI
    openai_apikey: process.env.openai_apikey,
    model: process.env.model,
    assistant: process.env.assistant,

      // Meta
    jwtToken: process.env.jwtToken,
    numberId: process.env.numberId,
    verifyToken: process.env.verifyToken,
    version: "v22.0",
};
