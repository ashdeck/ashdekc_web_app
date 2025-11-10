export type Subscribe = {
    name?: string
    email?: string
    package: "annual" | "monthly" | "lifetime"
}