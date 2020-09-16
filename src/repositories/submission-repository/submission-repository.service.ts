import { Injectable } from '@nestjs/common'
import SubmissionRepository from 'src/common/classes/repositories/submission-repository.class'
import QuoteModel from 'src/mongoose/models/quote.model'
import { IBaseSubmissionStatus } from 'src/common/interfaces/models/submission-status.interface'
import ISubmissionVerdict from 'src/common/interfaces/models/submission-verdict.interface'
import SubmissionStatusSchema from 'src/mongoose/schemas/submission-status-schema.class'

@Injectable()
export class SubmissionRepositoryService extends SubmissionRepository {
  async getPendingQuotes(serverId: string, blacklistAuthor: string[] = []) {
    const pending = await QuoteModel.find({
      submissionStatus: {
        $ne: null,
      },
      'submissionStatus.verdict': null,
      'submissionStatus.expireDt': {
        $gt: new Date(),
      },
      serverId,
      authorId: {
        $not: {
          $in: blacklistAuthor,
        },
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
      'submissionStatus.messageId': messageId,
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

    submission.submissionStatus = new SubmissionStatusSchema()
    Object.assign(submission.submissionStatus, submissionStatus)

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
