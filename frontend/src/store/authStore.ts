import { create } from 'zustand';
import api from "../api/axios"

type Role = "CLIENT" | "PROFESSIONAL" ;

type User = {
    id: string;
    email: string;
    role: Role;
    name?: string | null;
};

type AuthState = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;

    login: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;

    fetchCurrentUser: () => Promise<void>
};

const savedToken = localStorage.getItem("access_token");

const useAuthStore = create<AuthState>((set) => ({
     user: null,

     token: savedToken,

     isAuthenticated: !!savedToken,

     login: (token) => {
        localStorage.setItem("access_token", token);

        set({
            token,
            isAuthenticated: true,
        });
     },

     setUser: (user) => {
        set({
            user,
        });
     },

     logout: () => {
        localStorage.removeItem("access_token");

        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });
     },

     fetchCurrentUser: async () => {
        try {
            const response = await api.get<User>("/users/me");

            set({
                user: response.data,
                isAuthenticated: true,
            });
        } catch(error) {
            console.error("Failed to restore user:", error);

            localStorage.removeItem("access_token");

            set({
                user: null,
                token: null,
                isAuthenticated: false,
            });
        }
     },


}));

export default useAuthStore