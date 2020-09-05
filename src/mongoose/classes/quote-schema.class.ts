import {
  prop,
  mongoose,
  DocumentType,
  modelOptions,
} from '@typegoose/typegoose'
import IQuote from 'src/common/interfaces/models/quote.interface'
import TypegooseBase from '../utils/typegoose-base.class'
import ApprovalStatus from './approval-status-schema.class'
import ReceiveSchema from './receive-schema.class'

@modelOptions({
  options: {
    customName: 'quotes',
  },
})
export default class QuoteSchema extends TypegooseBase implements IQuote {
  @prop({ required: true })
  public content: string

  @prop({ required: true })
  public authorId!: string

  @prop()
  public yearOverride?: number

  @prop({ _id: false })
  public approvalStatus?: ApprovalStatus

  @prop({ type: () => ReceiveSchema })
  public receives?: mongoose.Types.DocumentArray<DocumentType<ReceiveSchema>>

  @prop({ required: true })
  public submitterId!: string

  @prop({ required: true })
  public submitDt!: Date

  public get quoteId() {
    return this._id.toHexString()
  }

  get dto(): IQuote {
    const {
      content,
      authorId,
      yearOverride,
      submitterId,
      submitDt,
      quoteId,
    } = this

    return {
      content,
      authorId,
      yearOverride,
      submitterId,
      submitDt,
      quoteId,
    }
  }
}
