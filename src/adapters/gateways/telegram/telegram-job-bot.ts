import { TelegramBot } from "typescript-telegram-bot-api";
import { Message } from "typescript-telegram-bot-api/dist/types";
import { searchJobFactory } from "main/factories/search-job-factory";
import { Provider } from "core/domain/entities/providers";

export class TelegramJobBot {
  private readonly bot: TelegramBot;

  public constructor(botToken: string) {
    this.bot = new TelegramBot({ botToken });
  }

  public async isAlive(): Promise<boolean> {
    try {
      return (await this.bot.getMe()).is_bot;
    } catch (error) {
      return false;
    }
  }

  public async initializeBot(): Promise<void> {
    try {
      await this.bot.startPolling();

      this.bot.on('message', async (message: Message) => {
        await this.handleMessage(message);
      });
    } catch (error) {
      console.error(error);
    }
  }

  private async handleMessage(message: Message): Promise<void> {
    try {
      if (!message.chat || !message.chat.id) return;
      const start = Date.now();

      let text = message.text || '';
      let filterByDay = false;
      if (message.text?.includes('/dia')) {
        text = message.text?.replace('/dia', '').trim();
        filterByDay = true;
      }

      await this.bot.sendMessage({
        chat_id: message.chat.id,
        text: 'Processando seu pedido...',
      });

      const userName = `${message.from?.first_name} ${message?.from?.last_name}`;

      const searchJobUseCase = searchJobFactory(Provider.SOLIDES);
      const jobs = await searchJobUseCase.execute({keyWord: text, filterByDay});

      if (!jobs.length && filterByDay) {
        await this.bot.sendMessage({
          chat_id: message.chat.id,
          text: 'Infelimente nenhum resultado foi encontrado para hoje. Tente novamente mais tarde.',
        });
        return;
      }

      const jobsString = jobs.map((job) =>
        `--------\n\n- Titulo: ${job.title} \n- Empresa: ${job.company} \n- Local: ${job.location} \n- Salario: ${job.salary} \n- Tipo de contrato: ${job.jobType} \n- Senioridade: ${job.seniority} \n- Data de anúncio: ${job.announcement} \n- Forma de contratação: ${job.hiringForm} \n- Link: [Candidatar-se](${job.link})`
      ).join('\n');

      await this.bot.sendMessage({
        chat_id: message.chat.id,
        parse_mode: 'Markdown',
        text: `Ola ${userName}, seus resultados de busca são:\n\n ${jobsString} \n\nO tempo de resposta foi de ${(Date.now() - start)}ms.`,
      });
    } catch (error) {
      console.error(error);
      await this.bot.sendMessage({
        chat_id: message.chat.id,
        text: 'Ocorreu um erro ao processar sua solicitação, tente novamente mais tarde ou insira um termo de busca válido.',
      });
    }
  }
}