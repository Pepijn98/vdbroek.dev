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

export interface ReposResponse {
    statusCode: number;
    statusMessage: string;
    repos?: Repo[];
}

export default ReposResponse;
