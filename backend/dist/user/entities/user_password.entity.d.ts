import { BaseEntity, EntityManager } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class UserPasswordEntity extends BaseEntity {
    user_id: number;
    password: string;
    user: UserEntity;
    static updatePassword(transactionalEntityManager: EntityManager, password: string, userId: number): Promise<UserPasswordEntity>;
}
