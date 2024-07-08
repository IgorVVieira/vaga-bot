import puppeteer from "puppeteer";
import { delay } from "../../../utils/delay";
import { ISearchJobProvider } from "../../../data/interfaces/search-job-provider.interface";

export class SearchJobSolides implements ISearchJobProvider<string> {
  public async search(keyWord: string): Promise<string> {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    const searchQuery = keyWord;
    const jobType = 'remoto';
    const seniority = 'junior';

    await page.goto(`https://vagas.solides.com.br/vagas?page=1&locals=&title=${searchQuery}&jobsType=${jobType}&seniorities=${seniority}&pcd=false`);

    await delay(3000);

    await page.waitForSelector('#next-page', { visible: true });

    const posts = await page.evaluate(() => {
      const postList: string[] = [];
      const postElements = document.querySelectorAll('ul.grid-cols-1');
      postElements.forEach(post => {
        const postContent = post.innerHTML;
        postList.push(postContent);
      })
      return postList.join('');
    });

    await browser.close();

    return posts;
  }
}