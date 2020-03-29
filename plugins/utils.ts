import { Plugin } from "@nuxt/types";
import { AxiosError } from "axios";
import { NotificationProgrammatic as Notification } from "buefy";
import { RGB, ErrorResponse, GithubUser } from "~/interfaces/types";

const plugin: Plugin = ({ app }, inject) => {
    inject("utils", {
        textColor(val: string | RGB): string {
            let color!: RGB;
            if (typeof val === "string") color = app.$utils.hexToRGB(val, 1, false) as RGB;
            const brightness = Math.round(((color.r * 299) + (color.g * 587) + (color.b * 114)) / 1000);
            return brightness > 200 ? "darkslategray" : "white";
        },
        changeLuminosity(color: string, amt: number): string {
            let usePound = false;

            if (color[0] === "#") {
                color = color.slice(1);
                usePound = true;
            }

            const num = parseInt(color, 16);

            let r = (num >> 16) + amt;

            if (r > 255) r = 255;
            else if (r < 0) r = 0;

            let b = ((num >> 8) & 0x00FF) + amt;

            if (b > 255) b = 255;
            else if (b < 0) b = 0;

            let g = (num & 0x0000FF) + amt;

            if (g > 255) g = 255;
            else if (g < 0) g = 0;

            return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
        },
        hexToRGB(hex: string, opacity = 1, asString = true): string | RGB | undefined {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (!result) return;

            const color = { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) };
            if (asString) {
                return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
            } else {
                return color;
            }
        },
        formatDateTime(old: string | Date): string {
            const date = new Date(old);
            const time = date.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            const formatted = date.toLocaleDateString("nl-NL", { year: "numeric", month: "2-digit", day: "2-digit" });
            return `${formatted} ${time}`;
        },
        isError(response: GithubUser | ErrorResponse): response is ErrorResponse {
            return !!(response as ErrorResponse).message;
        },
        handleError(error: AxiosError): void {
            if (error.response) {
                Notification.open({
                    type: "is-danger",
                    message: error.response.data.message ? error.response.data.message : error.response.data.statusMessage || "An error happened",
                    position: "is-top-right"
                });
            } else {
                Notification.open({
                    type: "is-danger",
                    message: error.message ? error.message : error.toString(),
                    position: "is-top-right"
                });
            }
        }
    });
};

export default plugin;
