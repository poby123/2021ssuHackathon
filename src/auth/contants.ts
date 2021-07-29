export const sessionConstants = {
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
}

export enum RolesEnum {
    NORMAL_USER = 'NORMAL_USER',
    MARKET_USER = 'MARKET_USER',
    GOVERNMENT = 'GOVERNMENT',
    ADMIN = 'ADMIN'
}