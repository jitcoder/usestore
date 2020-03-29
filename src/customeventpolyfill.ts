export default class CustomEvent {
  detail: any;
  type: string = 'Custom';
  constructor(key: string, options: any) {
    this.type = key;
    this.detail = options.detail;
  }
}
