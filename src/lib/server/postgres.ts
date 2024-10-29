import { env } from "$env/dynamic/private";
import postgres, { type JSONValue, type Sql } from "postgres";
import { FormError, FormErrorType, type Database } from "./db";
import type { FormsRow } from "./schema";

// TODO postgres should automatically create the tables or otherwise ensure the schema is correct

export class PostgresDatabase implements Database {
    private sql: Sql;
    constructor() {
        const postgresEnv = [
            env.POSTGRES_HOST,
            env.POSTGRES_PORT,
            env.POSTGRES_DB,
            env.POSTGRES_USER,
            env.POSTGRES_PASS,
        ];

        if (postgresEnv.some((e) => e == undefined || e.length <= 0)) {
            throw new Error("Database initalisation failed: POSTGRES_* is not set");
        }
        this.sql = postgres(`postgres://${env.POSTGRES_USER}` +
            `:${env.POSTGRES_PASS}` +
            `@${env.POSTGRES_HOST}` +
            `:${env.POSTGRES_PORT}` +
            `/${env.POSTGRES_DB}`, {
            transform: {
                    undefined: null
                }
            });
    }

    // TODO remove 
    public async ping() {
        await this.sql`
            insert into pings (value) values ('it works!')`;
    }

    public async submit(data: JSONValue, forId: number, clientAddress?: string) {
        const xs = await this.sql`
            insert into submissions (form_data, for_id, ip_address)
            values (${this.sql.json(data)}, ${forId}, ${clientAddress ?? null})
            returning *
        `;

        console.log(xs);
    }

    public async getForm(id: number, token?: string) {
        const [form]: [FormsRow?] = await this.sql`
            select * from forms where id = ${id}
        `;
        if (!form) throw new FormError(FormErrorType.NotFound);
        if (!form.open) throw new FormError(FormErrorType.Closed);
        if (form.expiry && form.expiry < new Date()) throw new FormError(FormErrorType.Expired);
        if (form.private) {
            if (!token) throw new FormError(FormErrorType.AuthRequried);
            // TODO implement token checking
        }

        return form.data;
    }
}