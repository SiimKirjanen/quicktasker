type WPQTResponse<T = any> = {
  success: boolean;
  messages: string[];
  data: T;
};

export type { WPQTResponse };
