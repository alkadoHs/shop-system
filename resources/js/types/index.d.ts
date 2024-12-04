import { Config } from 'ziggy-js';

export interface branch {
    id: number;
    name: string;
    users_count: number;
    products_count: number;
    created_at: string;
}

export interface Company {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    logo: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: string;
    phone: string;
    isActive: boolean;
    branch_id: number;
    company_id: number;
    branch: branch;
    company: Company;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        branches: branch[];
        sessions: {
            error: string;
            success: string;
            message: string;
        }
    };
    ziggy: Config & { location: string };
};
