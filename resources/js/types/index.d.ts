import { Config } from 'ziggy-js';

export interface branch {
    id: number;
    name: string;
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
    };
    ziggy: Config & { location: string };
};
