
export abstract class ApplicationError extends Error {
    public message: string
    public name: string
    public details?: unknown
    public status?: number

    constructor (message: string, details?: unknown, status?: number) {
        super(message)
        this.name = this.constructor.name
        this.details = details
        this.status = status ?? 400
        this.message = message

        Error.captureStackTrace(this, this.constructor)
    }
}