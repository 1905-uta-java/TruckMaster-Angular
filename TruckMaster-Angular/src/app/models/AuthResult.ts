import { User } from './User';

export interface AuthResult {
    authToken: string,
    user: User
}