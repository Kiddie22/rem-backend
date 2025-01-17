export default class JsonResponse {
  status: number;

  message: string;

  data: object;

  constructor(status: number, message: string, data?: object) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
