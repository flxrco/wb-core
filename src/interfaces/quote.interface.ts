import ISubmitInfo from './submit-info.interface'
import IReceive from './receive.interface'

export default interface IQuote {
  content: string

  // one of these two
  authorId?: string
  authorStr?: string

  yearOverride?: number // 1970 - current

  submission: ISubmitInfo
  receives: IReceive[]
}
