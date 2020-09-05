import IApprovalStatus from 'src/common/interfaces/models/approval-status.interface'
import { prop } from '@typegoose/typegoose'

export default class ApprovalStatusClass implements IApprovalStatus {
  @prop({ required: true })
  public expireDt!: Date

  @prop()
  public approveDt?: Date

  @prop({ required: true })
  public messageId!: string

  @prop({ required: true })
  public serverId!: string

  @prop({ required: true })
  public channelId!: string
}
