import axios from "axios";

export const solidesApi = axios.create({
  baseURL: 'https://apigw.solides.com.br/jobs/v3/portal-vacancies-new',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});