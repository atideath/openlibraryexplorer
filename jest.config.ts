import type { Config } from "jest";

const jestConfiguration: Config = {
    testEnvironment: "node",
    preset: "ts-jest",
    verbose: true,
};

export default jestConfiguration;