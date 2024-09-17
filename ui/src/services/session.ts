import { plainAxiosInstance, securedAxiosInstance } from '../common/axios.ts';
import { SigninPayload, SignupPayload } from '../types/session/payloads.ts';

const signup = async (payload: SignupPayload) => {
    try {
        const response = await plainAxiosInstance.post('/signup', payload);

        if (!response.data.csrf) {
            throw new Error('CSRF token is missing');
        }

        localStorage.csrf = response.data.csrf;
        localStorage.isAuthenticated = true;
        return response.data;
    } catch (err) {
        console.error('[SessionService]: Error signing up', err);
        delete localStorage.csrf;
        delete localStorage.isAuthenticated;
    }
};

const signin = async (payload: SigninPayload) => {
    try {
        const response = await plainAxiosInstance.post('/signin', payload);

        if (!response.data.csrf) {
            throw new Error('CSRF token is missing');
        }
        
        localStorage.csrf = response.data.csrf;
        localStorage.isAuthenticated = true;
        return response.data;
    } catch (err) {
        console.error('[SessionService]: Error signing in', err);
        delete localStorage.csrf;
        delete localStorage.isAuthenticated;
    }
};

const signout = async () => {
    try {
        const response = await securedAxiosInstance.delete('/signin');
        delete localStorage.csrf;
        delete localStorage.isAuthenticated;
        return response.data;
    } catch (err) {
        console.error('[SessionService]: Error signing out', err);
    }
};

export const SessionService = {
    signup,
    signin,
    signout
};