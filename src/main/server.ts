import { TelegramJobBot } from "../infra/telegram/telegram-job-bot";

const bot = new TelegramJobBot(process.env.TELEGRAM_BOT_TOKEN || '');

bot.initializeBot().catch((error) => {
  console.error(error);
});