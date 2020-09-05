import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IBase extends Base {}
export default class TypegooseBase extends TimeStamps implements IBase {
  _id: Types.ObjectId
  __v?: number
  __t?: string | number
}
