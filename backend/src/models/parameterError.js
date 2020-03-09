// export default function ParameterException(detail, field) {
//   this.detail = detail;
//   this.status = 422;
//   this.title = 'Invalid Attribute';
//   this.source = { pointer: '/data/attributes/' + field };
// }

export default class ParameterError extends Error {
  constructor(message, field) {
    super(message);
    this.errorObject = {
      detail: message,
      status: 422,
      title: 'Invalid Attribute',
      source: { pointer: '/data/attributes/' + field }
    };
  }
}
