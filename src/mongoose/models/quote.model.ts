import { getModelForClass } from '@typegoose/typegoose'
import QuoteSchema from '../classes/quote-schema.class'

const QuoteModel = getModelForClass(QuoteSchema)
export default QuoteModel
