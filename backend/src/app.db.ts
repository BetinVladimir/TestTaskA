import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import * as Pool from 'pg-pool';

@Injectable()
export class DB {
    private pool: Pool

    constructor() {
        this.pool = new Pool({
            host: process.env.bd_host ?? '127.0.0.1',
            database: process.env.bd_name ?? 'postgres',
            user: process.env.bd_user ?? 'postgres',
            password: process.env.bd_password ?? '12345',
            port: +process.env.bd_port || 25432,
            ssl: false,
            max: 20, // set pool max size to 20
            idleTimeoutMillis: 1000, // close idle clients after 1 second
            connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
            maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
        })
    }

    public async getConnection(): Promise<PoolClient> {
        return this.pool.connect()
    }
}