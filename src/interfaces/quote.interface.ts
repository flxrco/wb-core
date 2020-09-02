export default interface IQuote {
  content: string
  authorId?: string
  authorStr?: string
  yearOverride: number // 1970 - current
}
