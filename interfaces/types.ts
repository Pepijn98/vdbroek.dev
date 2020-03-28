/* eslint-disable camelcase */

export interface ErrorResponse {
    message: string;
    documentation_url: string;
}

export interface GithubUser {
    login: string;
    id: number;
    node_id: number;
    avatar_url: string;
    gravatar_id: string;
    html_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string | null;
    blog: string;
    location: string;
    email: string | null;
    hireable: boolean;
    bio: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following:number;
    created_at: string;
    updated_at: string;
}

export interface RGB {
    r: number;
    g: number;
    b: number;
}
