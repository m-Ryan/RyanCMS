import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

import { UserError } from '../../../common/filters/userError';
import dayjs = require('dayjs');
@Entity('json')
export class JsonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  json_id: number;

  @Column({
    type: 'int',
    default: 0,
  })
  created_at: number;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  mod: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  name: string;

  @Column({
    type: 'longtext'
  })
  content: string;

  public static addJson(mod: string, name: string, content: string) {
    const json = new JsonEntity();
    json.mod = mod;
    json.name = name;
    json.content = content;
    json.created_at = dayjs().unix();
    return json.save();
  }

  public static getJson(id: number) {
    return this.findOne(id);
  }

  public static async getJsonList(page: number = 1, size: number = 1) {
		const result = await this.findAndCount({
			skip: (page - 1) * size,
			take: size,
			order: {
				json_id: 'DESC'
			},
		});
		return {
			list: result[0],
			count: result[1]
		};
  }

  public static async deleteJson(id: number) {
	  return this.delete(id);
  }

  public static async updateJson(id: number, content: string) {
    const json = await this.findOne(id);
    if (!json) {
      throw new UserError('json不存在');
    }
    json.content = content;
    await json.save();
    return json;
  }

}
