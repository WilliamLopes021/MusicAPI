import "dotenv/config";
import App from "./app/app";
import { connectDatabase } from "./config/database";

const PORT = process.env.PORT || 3000;
const app = new App();

const start = async (): Promise<void> => {
  try {
    await connectDatabase();
    app.app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
    process.exit(1);
  }
};

start();
