import { defineConfig } from 'drizzle-kit';
import * as fs from 'fs';
import * as path from 'path';

function loadEnv() {
  const envPath = path.resolve(__dirname, '.env.local');
  const envData = fs.readFileSync(envPath, 'utf8');
  const envVariables = envData.split('\n');

  envVariables.forEach(variable => {
    const [key, value] = variable.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

loadEnv();

export default defineConfig({
  schema: './app/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
});








/* import { defineConfig } from "drizzle-kit";


export default defineConfig({
  schema: "./app/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
});
 */