export const nextFetchCache = {
    cache: process.env.NODE_ENV == "development" ? 'no-store' : 'force-cache',
    // next: {
    //     revalidate: process.env.NODE_ENV == "development" ? 0 : undefined
    // }
} as const