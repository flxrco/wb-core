import ISubmissionStatus from 'src/common/interfaces/models/submission-status.interface'
import { prop, Prop } from '@typegoose/typegoose'
import ApprovalRequirementsSchema from './approval-requirements-schema.class'
import SubmissionVerdictSchema from './submission-verdict-schema.class'
import moment = require('moment-timezone')
import ApprovalCause from 'src/common/enums/approval-cause.enum'
import _ = require('lodash')
import TypegooseBase from '../utils/typegoose-base.class'

export default class SubmissionStatusSchema extends TypegooseBase
  implements ISubmissionStatus {
  @prop({ required: true })
  expireDt!: Date

  @prop()
  approveDt?: Date

  @prop({ required: true })
  messageId!: string

  @prop({ required: true })
  channelId!: string

  @prop({ _id: false })
  requirements!: ApprovalRequirementsSchema

  @prop()
  verdict?: SubmissionVerdictSchema

  @Prop({ default: () => new Date() })
  messageDt: Date

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
      'channelId',
      'expireDt',
      'isApproved',
      'isPending',
      'requirements',
      'messageDt',
    ])
  }
}
