import { env } from "$env/dynamic/private";
import type { JSONValue } from "postgres";
import { PostgresDatabase } from "./postgres";

export enum FormErrorType {
    NotFound = "FormNotFound",
    Closed = "FormClosed",
    AuthRequried = "FormAuthRequired",
    Expired = "FormExpired"
}

export class FormError extends Error {
    public readonly type: FormErrorType
    constructor(type: FormErrorType) {
        super(type as string);
        this.type = type;
    }
}

export interface Database {
    getForm: (id: number, token?: string) => Promise<FormData>;
    submit: (data: JSONValue, forId: number, clientAddress?: string) => Promise<void>;
    ping: () => Promise<void>;
}

if (env.DB_TYPE.length <= 0) {
    throw new Error("Database not avalible: DB_TYPE is not set");
}

export let db: Database;
switch (env.DB_TYPE) {
    case "postgres":
        db = new PostgresDatabase();
        break;
    default:
        throw new Error("Database not avalible: '" + env.DB_TYPE + "' is not supported");
}
