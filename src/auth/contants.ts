export const sessionConstants = {
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
}

export enum Auths {
    NORMAL_USER = 'NORMAL_USER',
    MARKET_USER = 'MARKET_USER',
    GOVERNMENT = 'GOVERNMENT',
    ADMIN = 'ADMIN'
}