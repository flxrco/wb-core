import { prop } from '@typegoose/typegoose'
import IReceive from 'src/interfaces/receive.interface'

export default class ReceiveClass implements IReceive {
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
}
