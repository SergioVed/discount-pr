export class CreateUserDtoRepository {
    firstName: string
    lastName: string
    email: string
    password: string
    role: 'MANAGER' | 'ADMIN'
}