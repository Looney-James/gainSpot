import { User } from "src/app/models/user";

export interface State {
    //Check for authentication
    isAuthenticated: boolean;
    //Check for actual data if authenticated
    user: User | null;
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};