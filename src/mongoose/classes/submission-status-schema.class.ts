import ISubmissionStatus from 'src/common/interfaces/models/submission-status.interface'
import { prop } from '@typegoose/typegoose'
import ApprovalRequirementsSchema from './approval-requirements-schema.class'
import SubmissionVerdictSchema from './submission-verdict-schema.class'
import moment = require('moment-timezone')
import ApprovalCause from 'src/common/enums/approval-cause.enum'
import _ from 'lodash'

export default class SubmissionStatusSchema implements ISubmissionStatus {
  @prop({ required: true })
  expireDt!: Date

  @prop()
  approveDt?: Date

  @prop({ required: true, unique: true })
  messageId!: string

  @prop({ required: true })
  serverId!: string

  @prop({ required: true })
  channelId!: string

  @prop({ _id: false })
  requirements!: ApprovalRequirementsSchema

  @prop()
  verdict?: SubmissionVerdictSchema

  get isPending() {
    return this.verdict && moment().isBefore(moment(this.expireDt))
  }

  get isApproved(): boolean {
    if (!this.verdict) {
      return false
    }

    return !!ApprovalCause[this.verdict.cause]
  }

  toDto(): ISubmissionStatus {
    return _.pick(this, [
      'messageId',
      'serverId',
      'channelId',
      'expireDt',
      'isApproved',
      'isPending',
      'requirements',
    ])
  }
}
