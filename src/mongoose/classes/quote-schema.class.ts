import {
  prop,
  mongoose,
  DocumentType,
  modelOptions,
} from '@typegoose/typegoose'
import IQuote from 'src/common/interfaces/models/quote.interface'
import TypegooseBase from '../utils/typegoose-base.class'
import ApprovalStatus from './submission-status-schema.class'
import ReceiveSchema from './receive-schema.class'
import _ from 'lodash'

@modelOptions({
  options: {
    customName: 'quotes',
  },
})
export default class QuoteSchema extends TypegooseBase implements IQuote {
  @prop({ required: true })
  content: string

  @prop({ required: true })
  authorId!: string

  @prop()
  yearOverride?: number

  @prop()
  submissionStatus?: ApprovalStatus

  @prop({ type: () => ReceiveSchema })
  receives?: mongoose.Types.DocumentArray<DocumentType<ReceiveSchema>>

  @prop({ required: true })
  submitterId!: string

  @prop({ required: true })
  submitDt!: Date

  @prop({ required: true, index: true })
  quoteId!: string

  toDto(): IQuote {
    return _.pick(this, [
      'content',
      'authorId',
      'yearOverride',
      'submitterId',
      'submitDt',
      'quoteId',
    ])
  }
}
