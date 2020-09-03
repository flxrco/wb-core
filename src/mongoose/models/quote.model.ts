import { getModelForClass } from '@typegoose/typegoose'
import QuoteClass from '../classes/quote.class'

const QuoteModel = getModelForClass(QuoteClass)
export default QuoteModel
