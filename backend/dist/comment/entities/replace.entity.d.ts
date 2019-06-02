import { BaseEntity } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { MessageEntity } from './message.entity';
import { CreateReplayDto } from '../form/create_replay.dto';
export declare class ReplayEntity extends BaseEntity {
    replay_id: number;
    content: string;
    created_at: number;
    user_id: number;
    user: UserEntity;
    message_id: number;
    message: MessageEntity;
    static createReplay(createReplayDto: CreateReplayDto, userId: number): Promise<ReplayEntity>;
    static deleteReplay(replayId: number, userId: number): Promise<import("typeorm").DeleteResult>;
}
