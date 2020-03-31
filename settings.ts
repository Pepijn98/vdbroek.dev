import dotenv from "dotenv";
import Settings from "~/interfaces/settings.types";
import pkg from "./package.json";

dotenv.config();

const env = process.env.NODE_ENV || "development";

const settings: Settings = {
    env,
    version: pkg.version,
    host: env === "development" ? "http://localhost:3000" : "https://vdbroek.dev",
    google: {
        test: env === "development",
        analytics: {
            id: process.env.TRACKING_ID || "",
            domain: env === "production" ? "https://vdbroek.dev" : "http://localhost:3000"
        }
    },
    sentry: {
        dsn: process.env.DSN || "",
        // publishRelease: true,
        // attachCommits: true,
        repo: pkg.repository.url,
        config: {
            environment: env
        }
    }
};

export default settings;
