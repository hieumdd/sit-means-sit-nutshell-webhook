import { BigQuery } from '@google-cloud/bigquery';

const client = new BigQuery();

const DATASET = 'nutshell';

export type InsertConfig = {
    table: string;
    schema: Record<string, any>[];
};

export const insert = ({ table, schema }: InsertConfig, rows: any[]) => {
    return client.dataset(DATASET).table(table).insert(rows, { schema });
};
