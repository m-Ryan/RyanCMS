import { Injectable } from '@nestjs/common';
import { FunnyPictureEntity } from '../entities/picture.entity';
import { CreatePicturesDto } from '../form/create_picture.dto';
@Injectable()
export class Service {
  constructor() {}

  // getList(page: number, size: number, userId: number, secret?: number) {
  //   return FunnyPictureEntity.getList(page, size, userId, secret);
  // }

  createPhotos(createPhotosDto: CreatePicturesDto, userId: number) {
    return FunnyPictureEntity.createPhotos(createPhotosDto, userId);
  }

  getList(page: number, size: number, userId: number) {
    return FunnyPictureEntity.getList(page, size, userId);
  }

  deletePhotos(photoIds: number[], userId: number) {
    return FunnyPictureEntity.deletePhotos(photoIds, userId);
  }
}
