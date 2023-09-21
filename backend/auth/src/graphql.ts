
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class RegisterInput {
    username: string;
    password: string;
}

export class SignInInput {
    username: string;
    password: string;
}

export class AccessToken {
    token: string;
    exp: Date;
    refreshToken: string;
}

export abstract class IMutation {
    abstract register(input?: Nullable<RegisterInput>): boolean | Promise<boolean>;

    abstract signIn(input?: Nullable<SignInInput>): AccessToken | Promise<AccessToken>;

    abstract refreshToken(token: string): AccessToken | Promise<AccessToken>;
}

export abstract class IQuery {
    abstract hello(): string | Promise<string>;

    abstract profile(): User | Promise<User>;
}

export class User {
    id: string;
    uid: string;
    username: string;
}

type Nullable<T> = T | null;
