import ISubmissionVerdict from 'src/common/interfaces/models/submission-verdict.interface'
import { prop } from '@typegoose/typegoose'
import ApprovalCause from 'src/common/enums/approval-cause.enum'
import RejectionCause from 'src/common/enums/rejection-cause.enum'

export default class SubmissionVerdictSchema implements ISubmissionVerdict {
  @prop({ required: true, default: () => new Date() })
  verdictDt: Date

  @prop({ required: true })
  cause: ApprovalCause | RejectionCause

  @prop()
  triggerId?: string
}
