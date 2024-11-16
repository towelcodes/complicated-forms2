import { env } from "$env/dynamic/private";
import { PERMIT_IO_SHARING } from "$env/static/private";
import type { JSONValue } from "postgres";
import { PostgresDatabase } from "./postgres";

export enum FormErrorType {
    NotFound = "FormNotFound", // form not found in db
    Closed = "FormClosed", // form closed is true
    AuthRequried = "FormAuthRequired", // the form requires an access token but was not provided
    AuthInvalid = "FormAuthInvalid", // the access token is invalid
    Expired = "FormExpired", // the form expiry data has passed
    AuthExpred = "FormAuthExpired", // the access token expiry has passed
    Malformed = "FormMalformed" // the form in the database is invalid 
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

export const IO_SHARING = PERMIT_IO_SHARING != undefined && PERMIT_IO_SHARING == "true";
if (!IO_SHARING) {
    console.log("I/O objects will not be shared in this build");
}

if (env.DB_TYPE == undefined || env.DB_TYPE.length <= 0) {
    throw new Error("Database not avalible: DB_TYPE is not set");
}


let dbRef: Database | undefined;
export const db = (): Database => {
    if (IO_SHARING && dbRef) return dbRef;
    switch (env.DB_TYPE) {
        case "postgres":
            if (IO_SHARING) {
                dbRef = new PostgresDatabase();
                return dbRef;
            }
            return new PostgresDatabase();
        default:
            throw new Error("Database not avalible: '" + env.DB_TYPE + "' is not supported");
    }
};
