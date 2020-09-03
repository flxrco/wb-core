import ISubmitInfo from 'src/interfaces/submit-info.interface'
import { prop } from '@typegoose/typegoose'

export default class SubmitInfoClass implements ISubmitInfo {
  @prop()
  public approveDt?: Date

  @prop({ required: true })
  public messageId!: string

  @prop({ required: true })
  public serverId!: string

  @prop({ required: true })
  public channelId!: string

  @prop({ required: true })
  public submitterId!: string

  @prop({ required: true })
  public submitDt!: Date
}
