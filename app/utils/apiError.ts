export class ApiError extends Error {
  status: number;
  /**
   * Creates an instance of ApiError.
   * @param {number} status The HTTP status code for the error.
   * @param {string} message The error message.
   */
  constructor(status: number, message: string) {
    super(message)
    this.status = status;
  }
}
