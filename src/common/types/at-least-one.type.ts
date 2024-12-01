export type AtLeastOne<T, K extends keyof T = keyof T> = K extends keyof T ? Pick<T, K> & Partial<Omit<T, K>> : never;
