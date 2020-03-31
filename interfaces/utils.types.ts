import { RGB, ErrorResponse, GithubUser } from "./types";

export interface Utils {
    hasWebpSupport: boolean;
    textColor(val: string | RGB): string;
    changeLuminosity(color: string, amt: number): string;
    hexToRGB(hex: string, opacity?: number, asString?: boolean): string | RGB | undefined;
    formatDateTime(old: string | Date): string;
    isError(response: GithubUser | ErrorResponse): response is ErrorResponse;
    handleError(error: any): void;
    supportsWebp(feature: "lossy" | "lossless" | "alpha" | "animation"): Promise<{ feature: string, isSupported: boolean }>;
};

export default Utils;
