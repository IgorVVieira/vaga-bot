import moment from "moment";

export class DateHelper {
  public static isToday(date: string): boolean {
    const today = moment().format('YYYY-MM-DD');
    return moment(date).isSame(today);
  }

  public static formatISODate(date: string): string {
    return moment(date).format('DD/MM/YYYY');
  }
}