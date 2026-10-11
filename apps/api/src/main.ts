import 'dotenv/config'; // carrega o .env (o Nest não faz isso sozinho)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { initFirebase } from './auth/firebase.js';
import { setupApp } from './setup-app.js';

async function bootstrap() {
  initFirebase(); // SUB-008
  const app = await NestFactory.create(AppModule);
  setupApp(app); // NOVO
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
