import 'dotenv/config';
import { createApp } from './cmd/app/app';

const port = Number(process.env.PORT ?? 3000);
const app = createApp();

app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`);
});
