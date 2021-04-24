import { Injectable, HttpService } from '@nestjs/common';
import _ from 'lodash';
import { SendEmailJsonDto } from '../form/send_email.dto';
import sgMail from '@sendgrid/mail';
import { UserError } from '@/app/common/filters/userError';

@Injectable()
export class EmailService {
	constructor(private readonly httpService: HttpService) { }

	async senEmail(data: SendEmailJsonDto) {

		sgMail.setApiKey(process.env.SENDGRID_API_KEY);


		const msg = {
			from: 'canhua.mao@gmail.com',
			to: data.to_email,
			subject: data.subject,
			text: data.text,
			html: data.html,
		};

		try {
			await sgMail.send(msg);
		} catch (error) {
			throw new UserError(error.response.body.errors[0].message, error.code);
		}
	}

}
