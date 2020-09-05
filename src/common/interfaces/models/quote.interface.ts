export default interface IQuote {
  content: string

  authorId: string

  // 1970 - current
  yearOverride?: number

  submitterId: string
  submitDt: Date

  quoteId: string
}
