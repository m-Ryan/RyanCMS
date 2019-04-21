import { Injectable, HttpService } from '@nestjs/common';
import _ from 'lodash';
import puppeteer from 'puppeteer';
import fs from 'fs';
import { uploadQiuNiuFile, fsReadAsync, fsUnlinkAsync } from '../../util/upload';
import { UserError } from '../../common/filters/userError';
const { json2ts } = require('json-ts');
const PDF_NAME = process.cwd() + '/public/temp.pdf';
@Injectable()
export class ToolsService {
	constructor(private readonly httpService: HttpService) {}

	async getJsonToTs(data: string) {
		return json2ts(data);
	}

	async getPDF(data: string) {
		try {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			await page.setContent(data);
			await page.emulateMedia('screen');
			await page.pdf({ path: PDF_NAME, format: 'A4', printBackground: true });
			await browser.close();
			const rfs = await fsReadAsync(PDF_NAME);
			const resUrl = await uploadQiuNiuFile({ data: rfs });
			await fsUnlinkAsync(PDF_NAME);
			return resUrl;
		} catch (error) {
			throw new UserError(error.message);
		}
	}

	async getPagePDF(url: string) {
		try {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			await page.goto(url);
			await page.emulateMedia('screen');
			await page.pdf({ path: PDF_NAME, format: 'A4', printBackground: true });
			await browser.close();
			const rfs = await fsReadAsync(PDF_NAME);
			const resUrl = await uploadQiuNiuFile({ data: rfs });
			await fsUnlinkAsync(PDF_NAME);
			return resUrl;
		} catch (error) {
			throw new UserError(error.message);
		}
	}
}
