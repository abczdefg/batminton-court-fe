import 'axios';

declare module 'axios' {
  interface AxiosResponse {
    error: null | { code: number; message: string; };
  }
}
