import IApprovalRequirements from 'src/common/interfaces/models/approval-requirements.interface'
import { prop } from '@typegoose/typegoose'

export default class ApprovalRequirementsSchema
  implements IApprovalRequirements {
  @prop({ required: true })
  emoji!: string

  @prop({ required: true, min: 1 })
  count!: number
}
