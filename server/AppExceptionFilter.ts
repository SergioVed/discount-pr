import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { ApplicationError } from "src/core/errors/base/ApplicationError";
import { DomainError } from "src/core/errors/base/DomainError";

@Catch(DomainError, ApplicationError)
export class AppExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse()
        const status = exception.statusCode ?? HttpStatus.BAD_REQUEST

        response.status(status).json({
            statusCode: status,
            error: exception.name,
            message: exception.message,
            details: exception.details
        })
    }
}