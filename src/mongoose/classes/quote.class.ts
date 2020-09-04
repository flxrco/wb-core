import { prop } from '@typegoose/typegoose'
import ApprovalStatus from './approval-status.class'
import Receive from './receive.class'
import IQuote from 'src/common/interfaces/models/quote.interface'

export default class Quote implements IQuote {
  @prop({ required: true })
  public content: string

  @prop({ required: true })
  public authorId!: string

  @prop()
  public yearOverride?: number

  @prop({ required: true })
  public submission!: ApprovalStatus

  @prop({ required: true, default: () => [] })
  public receives!: Receive[]

  @prop({ required: true })
  public submitterId!: string

  @prop({ required: true })
  public submitDt!: Date
}
