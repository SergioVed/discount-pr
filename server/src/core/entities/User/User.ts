export class User {
    constructor (
        readonly userId : number,
        readonly restaurantId: number,
        readonly firstName: string,
        readonly lastName: string,
        readonly role: 'ADMIN' | 'MANAGER',
        readonly email: string,
        readonly password: string,
        readonly isActive: boolean
    ) {}
}