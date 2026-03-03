
export abstract class DomainError extends Error {
    public name: string
    public details?: unknown

    constructor (message: string, details?: unknown) {
        super(message)
        this.name = this.constructor.name
        this.details = details
        Error.captureStackTrace(this, this.constructor)
    }
}
