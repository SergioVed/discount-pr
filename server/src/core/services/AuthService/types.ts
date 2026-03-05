export type RegisterUserInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type LoginUserInput = {
    email: string;
    password: string;
}