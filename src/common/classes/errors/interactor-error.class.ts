export default class InteractorError extends Error {
  constructor(private errCode: InteractorErrorCodes) {
    super()
  }
}

export enum InteractorErrorCodes {
  QUOTE_APPROVED,
  QUOTE_EXPIRED,
  QUOTE_NOT_FOUND,
}
