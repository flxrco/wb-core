import { prop } from '@typegoose/typegoose'
import IReceive from 'src/common/interfaces/models/receive.interface'
import TypegooseBase from '../utils/typegoose-base.class'

export default class ReceiveSchema extends TypegooseBase implements IReceive {
  @prop({ required: true })
  public receiverId!: string

  @prop({ required: true, default: () => new Date() })
  public receiveDt!: Date

  @prop({ required: true })
  public serverId!: string

  @prop({ required: true })
  public channelId!: string

  @prop({ required: true })
  public messageId!: string

  get receiveId() {
    return this._id.toHexString()
  }

  get dto(): IReceive {
    const {
      receiverId,
      receiveDt,
      serverId,
      channelId,
      messageId,
      receiveId,
    } = this

    return {
      receiverId,
      receiveDt,
      serverId,
      channelId,
      messageId,
      receiveId,
    }
  }
}