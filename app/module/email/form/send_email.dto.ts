import { Model } from '../../../common/model';


export class SendEmailJsonDto extends Model {
  subject: string = undefined;
  html: string = undefined;
  text: string = undefined;
  to_email: string = undefined;

  constructor(data: SendEmailJsonDto) {
    super();
    super.setAttributes(data);
  }

  attributeLabels() {
    return {
      subject: 'subject',
      text: 'text',
      html: 'html',
      to_email: 'html',
    };
  }

  rules() {
    return [[['subject', 'text', 'html', 'to_email'], 'required']];
  }
}
