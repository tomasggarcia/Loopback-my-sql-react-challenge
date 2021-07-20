export interface IErrorUser {
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    pass?: boolean;
    repeatPass?: boolean;
    captcha?: boolean;
    username?: boolean;
}

export interface IErrorProduct {
    name?: boolean;
    description?: boolean;
    price?: boolean;
}

export interface IUser {
    firstName?: string;
    lastName?: string;
    email?: string;
    pass?: string;
    repeatPass?: string;
    username?: string;
    localCart?: any;
}

export interface IColors {
    firstName?: string;
    lastName?: string;
    email?: string;
    pass?: string;
    repeatPass?: string;
    username?: string | undefined;
}

export interface IValidationError {
    userName?: string | undefined;
    email?: string | undefined;
}
