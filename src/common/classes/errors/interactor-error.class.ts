import InteractorErrorCodes from 'src/common/enums/errors/interactor-error-codes.enum'

export default class InteractorError extends Error {
  constructor(private errCode: InteractorErrorCodes) {
    super()
  }
}

export { InteractorErrorCodes }
