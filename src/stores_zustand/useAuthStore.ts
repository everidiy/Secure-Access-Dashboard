import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StoredUser } from "../types_ts/user";

type AuthState = {
    token: string | null;
    currentUser: StoredUser | null;
    login: (user: StoredUser) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            currentUser: null,
            login: (user) =>
                set({
                    token: `demo-jwt-${crypto.randomUUID()}`,
                    currentUser: user,
                }),
            logout: () => set({ token: null, currentUser: null })
        }),
        {
            name: 'secure-access-auth',
            partialize: (state) => ({
                token: state.token,
                currentUser: state.currentUser,
            }),
        }
    )
)