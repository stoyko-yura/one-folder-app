import './lib/aliases';

import { config } from '@/config';
import app from '@/root/app';

const start = () => {
  const { PORT } = config;

  try {
    app.listen(PORT, () => {
      console.log(`Server running http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
