export interface SignupPayload {
    email: string;
    password: string;
    password_confirmation: string;
}

export interface SigninPayload {
    email: string;
    password: string;
}