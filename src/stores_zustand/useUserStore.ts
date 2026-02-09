import { create } from "zustand";
import type { StoredUser, UserFormData } from "../types_ts/user";

type UserState = {
    users: StoredUser[],
    addUser: (user: UserFormData) => string | null;
    toggleActive: (id: string) => string | null;
    removeUser: (id: string) => string | null;
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [
        {
            id: "1",
            userName: "everidiy",
            email: "everidiy@mail.com",
            password: "12345678",
            role: "admin",
            isActive: true,
        },
    ],

    addUser: (user) => {
        const { users } = get();

        if (
            user.role === 'admin' &&
            users.some((u) => u.role === 'admin' && u.isActive)
        ) {
            return "Активный admin уже существует!"
        }

        set({
            users: [...users, { ...user, id: crypto.randomUUID() }],
        });

        return null;
    },

    toggleActive: (id) => {
        const { users } = get();
        const user = users.find((u) => u.id === id);

        if (!user) return null;

        if (
            user.role === "admin" &&
            user.isActive &&
            users.filter((u) => u.role === "admin" && u.isActive).length === 1
        ) {
            return "Нельзя деактивировать активного админа!";
        }
    
        set({
            users: users.map((u) => 
            u.id === id ? {...u, isActive: !u.isActive} : u
        )})

        return null;
    },

    removeUser: (id) => {
        const { users } = get();
        const user = users.find((u) => u.id === id);

        if (!user) return null;

        if (
            user.role === 'admin' &&
            users.filter((u) => u.role === 'admin').length === 1
        ) {
            return "Нельзя удалить последнего admin!";
        }

        set({ users: users.filter((u) => u.id !== id) });
        return null;
    }
}))    