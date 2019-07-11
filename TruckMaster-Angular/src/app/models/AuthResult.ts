import { User } from './User';

export interface AuthResult {
    token: string,
    user: User
}