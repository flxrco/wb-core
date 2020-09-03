import IQuote from 'src/interfaces/quote.interface'
import { prop } from '@typegoose/typegoose'
import SubmitInfo from './submit-info.class'
import Receive from './receive.class'

export default class Quote implements IQuote {
  @prop({ required: true })
  public content: string

  @prop()
  public authorId?: string

  @prop()
  public authorStr?: string

  @prop()
  public yearOverride?: number

  @prop({ required: true })
  public submission!: SubmitInfo

  @prop({ required: true, default: () => [] })
  public receives!: Receive[]
}