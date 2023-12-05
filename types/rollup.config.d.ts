declare const _default: ({
    input: string;
    output: ({
        file: string;
        format: string;
        sourcemap: boolean;
        name: string;
    } | {
        file: string;
        format: string;
        sourcemap: boolean;
        name?: undefined;
    })[];
    plugins: any[];
    external: string[];
} | {
    input: string;
    output: {
        file: string;
        format: string;
    }[];
    plugins: import("rollup").Plugin[];
    external: RegExp[];
})[];
export default _default;
