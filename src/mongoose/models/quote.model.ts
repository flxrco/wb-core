import { getModelForClass } from '@typegoose/typegoose'
import QuoteSchema from '../schemas/quote-schema.class'

const QuoteModel = getModelForClass(QuoteSchema)
export default QuoteModel
