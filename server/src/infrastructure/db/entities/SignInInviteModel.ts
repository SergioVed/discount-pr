import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './UserModel';

interface SignInInviteCreationAttrs {
  email_to: string;
  created_by: number;
  token?: string;
  expires_at?: Date;
}

@Table({ tableName: 'signIn_invite' })
export class SignInInviteModel extends Model<
  SignInInviteModel,
  SignInInviteCreationAttrs
> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare invite_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare token: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare email_to: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare created_by: number;

  @Column({ type: DataType.DATE })
  declare usedAt: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  declare expires_at: Date;
}
