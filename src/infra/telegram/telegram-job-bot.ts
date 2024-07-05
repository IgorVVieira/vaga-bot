import { TelegramBot } from "typescript-telegram-bot-api";
import { Message } from "typescript-telegram-bot-api/dist/types";
import { searchJobFactory } from "../../main/factories/search-job-factory";
import { Provider } from "../../domain/entities/providers";

export class TelegramJobBot {
  private readonly bot: TelegramBot;

  public constructor(botToken: string) {
    this.bot = new TelegramBot({ botToken });
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

      await this.bot.sendMessage({
        chat_id: message.chat.id,
        text: 'Processando seu pedido...',
      });

      const searchJobUseCase = searchJobFactory(Provider.SOLIDES);

      const jobs = await searchJobUseCase.handle(message.text as string);

      const jobsString = jobs.map((job: any) =>
        `--------\n\n- Titulo: ${job.title} \n- Empresa: ${job.company} \n- Local: ${job.location} \n- Salario: ${job.salary} \n- Tipo de contrato: ${job.jobType} \n- Senioridade: ${job.seniority} \n- Data de anúncio: ${job.announced} \n- Forma de contratação: ${job.hiringForm} \n- Link: ${job.link}`
      ).join('\n');

      await this.bot.sendMessage({
        chat_id: message.chat.id,
        text: jobsString,
      });
    } catch (error) {
      await this.bot.sendMessage({
        chat_id: message.chat.id,
        text: 'Ocorreu um erro ao processar sua solicitação, tente novamente mais tarde ou insira um termo de busca válido.',
      });
    }
  }
}