import { RGB, ErrorResponse, GithubUser } from "./types";

export interface Utils {
    textColor(val: string | RGB): string;
    changeLuminosity(color: string, amt: number): string;
    hexToRGB(hex: string, opacity?: number, asString?: boolean): string | RGB | undefined;
    formatDateTime(old: string | Date): string;
    isError(response: GithubUser | ErrorResponse): response is ErrorResponse;
    handleError(error: any): void;
};

export default Utils;
