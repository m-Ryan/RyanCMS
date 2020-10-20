import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  getConnection,
  In,
} from 'typeorm';
import { CreatePicturesDto } from '../form/create_picture.dto';
import dayjs from 'dayjs';

@Entity('funny_picture')
export class FunnyPictureEntity extends BaseEntity {
  @PrimaryGeneratedColumn() funny_picture_id: number;
  @Column({
    type: 'varchar',
    default: '',
  })
  title: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  desc: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  tag: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  url: string;

  @Column({
    type: 'int',
    default: 0,
  })
  created_at: number;

  @Column({
    type: 'int',
    default: 0,
  })
  updated_at: number;

  @Column({
    type: 'int',
    default: 0,
  })
  deleted_at: number;

  @Column({
    type: 'int',
    default: 0,
  })
  user_id: number;

  public static async createPhotos(dataDto: CreatePicturesDto, userId: number) {
    const currentTime = dayjs().unix();
    const pictures = dataDto.pictures.map((photo) => ({
      ...photo,
      user_id: userId,
      created_at: currentTime,
      updated_at: currentTime,
    }));
    return await getConnection()
      .createQueryBuilder()
      .insert()
      .into('picture')
      .values(pictures)
      .execute();
  }

  public static async getList(
    page: number,
    size: number = 10,
    userId?: number
  ) {
    const condition: any = {
      deleted_at: 0,
    };
    if (userId) {
      condition.user_id = userId;
    }
    const result = await this.findAndCount({
      where: condition,
      skip: (page - 1) * Math.min(size, 999),
      take: size,
    });

    return {
      list: result[0],
      count: result[1],
    };
  }

  public static deletePhotos(pictureIds: number[], userId: number) {
    return this.update(
      {
        funny_picture_id: In(pictureIds) as any,
        user_id: userId,
        deleted_at: 0,
      },
      {
        deleted_at: dayjs().unix(),
      }
    );
  }
}
