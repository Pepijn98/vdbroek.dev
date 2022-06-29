export interface Stargazers {
    totalCount: number;
}

export interface FundingLink {
    platform: string;
    url: string;
}

export interface IssuesOpen {
    totalCount: number;
}

export interface IssuesClosed {
    totalCount: number;
}

export interface PrimaryLanguage {
    name: string;
    color: string;
}

export interface Topic {
    name: string;
}

export interface Repo {
    name: string;
    createdAt: string;
    updatedAt: string;
    url: string;
    description: string | null;
    forkCount: number;
    homepageUrl: string | null;
    stargazers: Stargazers;
    fundingLinks: FundingLink[];
    issuesOpen: IssuesOpen;
    issuesClosed: IssuesClosed;
    primaryLanguage: PrimaryLanguage;
    topics: Topic[];
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

export interface ReposResponse {
    statusCode: number;
    statusMessage: string;
    repos?: Repo[];
}

export interface ErrorResponse {
    message: string;
    documentation_url: string;
}
