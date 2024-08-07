export interface ISolidesJobData {
  title?: string;
  description?: string;
  companyName?: string;
  state?: {
    name?: string;
    code?: string;
  },
  city?: {
    name?: string;
  }
  redirectLink?: string;
  homeOffice?: boolean;
  jobType?: string;
  createdAt?: string;
  salary?: {
    initialRange?: number;
    finalRange?: number;
  }
}

export interface ISolidesJobResponse {
  success?: boolean;
  data?: {
    totalPages?: number;
    currentPage?: number;
    count?: number;
    data?: ISolidesJobData[];
  };
}