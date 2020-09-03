export default interface ISubmitInfo {
  // if truthy, then the quote was approved
  approveDt?: Date

  // this is to track where the bot acknowledgement message will be
  messageId: string
  serverId: string
  channelId: string

  submitterId: string
  submitDt: Date
}