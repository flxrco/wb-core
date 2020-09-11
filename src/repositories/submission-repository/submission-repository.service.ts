import { Injectable } from '@nestjs/common'
import SubmissionRepository from 'src/common/classes/repositories/submission-repository.class'
import QuoteModel from 'src/mongoose/models/quote.model'
import { IBaseSubmissionStatus } from 'src/common/interfaces/models/submission-status.interface'
import ISubmissionVerdict from 'src/common/interfaces/models/submission-verdict.interface'

@Injectable()
export class SubmissionRepositoryService extends SubmissionRepository {
  async getPendingQuotes(serverId: string) {
    const pending = await QuoteModel.find({
      submissionStatus: {
        $ne: null,
      },
      'approvalStatus.serverId': serverId,
      'approvalStatus.approveDt': null,
      'approvalStatus.expireDt': {
        $gt: new Date(),
      },
    }).exec()

    return pending.map(record => {
      const { submissionStatus } = record
      return {
        quote: record.toDto(),
        submissionStatus: submissionStatus.toDto(),
        requirements: submissionStatus.requirements,
      }
    })
  }

  async findPendingQuotebyMessage(messageId: string) {
    const submission = await QuoteModel.findOne({
      submissionStatus: {
        $ne: null,
      },
      'approvalStatus.messageId': messageId,
    }).exec()

    if (!submission) {
      return null
    }

    const { submissionStatus } = submission
    return {
      quote: submission.toDto(),
      submissionStatus: submissionStatus.toDto(),
      requirements: submissionStatus.requirements,
    }
  }

  async setSubmissionStatus(
    quoteId: string,
    submissionStatus: IBaseSubmissionStatus
  ) {
    const submission = await QuoteModel.findOne({
      quoteId,
    }).exec()

    if (!submission) {
      return undefined
    }

    submission.set('submissionStatus', submissionStatus)
    await submission.save()

    return submission.submissionStatus.toDto()
  }

  async getSubmissionStatus(quoteId: string) {
    const status = await QuoteModel.findOne({
      quoteId,
    }).exec()

    if (!status || !status.submissionStatus) {
      return undefined
    }

    return status.submissionStatus.toDto()
  }

  async setSubmissionVerdict(quoteId: string, verdict: ISubmissionVerdict) {
    const submission = await QuoteModel.findOne({
      quoteId,
    }).exec()

    if (!submission || !submission.submissionStatus) {
      return undefined
    }

    submission.set('submissionStatus.verdict', verdict)
    await submission.save()

    return submission.submissionStatus.verdict
  }
}
