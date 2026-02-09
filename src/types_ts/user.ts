type Role = "admin" | "editor" | "viewer";

export interface UserFormData {
    userName: string;
    email: string;
    password: string;
    role: Role;
    isActive: boolean;
}

export interface StoredUser extends UserFormData {
    id: string;
}