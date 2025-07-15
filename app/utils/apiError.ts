export class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;

        Error.captureStackTrace(this, this.constructor);
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export class ValidationErr extends ApiError {
  constructor(message: string) {
    super(400, message);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(409, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(404, message);
  }
}

export class DatabaseError extends ApiError {
  constructor(message: string = "Database error") {
    super(500, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized") {
    super(401, message);
  }
}
