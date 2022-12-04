export type Namespace<Args extends any[]> = <T>(...args: Args) => T & {
    [name: string]: Namespace<Args>
}

export type Options<Args extends any[]> = (path: string, ...args: Args) => any | {
    base?: string;
    root?: string;
    joiner?: string;
    placeholder?: string;
    execute: (path: string, ...args: Args) => any
}

export default function namespace<Args extends any[]>(options?: Options<Args>): Namespace<Args>