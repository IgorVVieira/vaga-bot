import express, { Request, Response } from 'express'

import { TelegramJobBot } from '@infra/telegram/telegram-job-bot';


const bot = new TelegramJobBot(process.env.TELEGRAM_BOT_TOKEN || '');

bot.initializeBot().catch((error) => {
  console.error(error);
});

const app = express();

const defaultPort = 3000;

app.listen(process.env.PORT || defaultPort, () => {
  console.log(`Server is running on port ${process.env.PORT || defaultPort}`);
});

app.get('/health', async (req: Request, res: Response) => {
  const status = await bot.isAlive() ? 'online' : 'offline';
  res.send({
    uptime: process.uptime(),
    status,
    timestamp: new Date().toISOString(),
  });
});