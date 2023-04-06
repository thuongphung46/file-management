export type ErrorResponse = {
  data: any;
  status: number;
  statusText: string;
  message?: string;
};

export type ApiResponse<T> = {
  msg_code?: number;
  acknowledge?: boolean;
  data?: T;
  content?: T;
  message?: string;
};

