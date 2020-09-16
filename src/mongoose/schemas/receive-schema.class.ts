import { prop } from '@typegoose/typegoose'
import IReceive from 'src/common/interfaces/models/receive.interface'
import TypegooseBase from '../utils/typegoose-base.class'

export default class ReceiveSchema extends TypegooseBase implements IReceive {
  @prop({ required: true })
  receiverId!: string

  @prop({ required: true, default: () => new Date() })
  receiveDt!: Date

  @prop({ required: true })
  serverId!: string

  @prop({ required: true })
  channelId!: string

  @prop({ required: true })
  messageId!: string

  @prop({ required: true, index: true })
  receiveId!: string
}
