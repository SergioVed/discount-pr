
export class CreateUserDto {
    first_name: string
    last_name: string
    role: 'ADMIN' | 'MANAGER'
    email: string  
    password: string 
}