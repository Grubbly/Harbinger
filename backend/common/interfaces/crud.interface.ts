import { DeleteResult, UpdateResult } from "typeorm";

export interface CRUD {
    list: (limit: number, page: number) => Promise<any>;
    create: (resource: any) => Promise<any>;
    putById: (id: string, resource: any) => Promise<UpdateResult>;
    readById: (id: string) => Promise<any>;
    deleteById: (id: string) => Promise<DeleteResult>;
    patchById: (id: string, resource: any) => Promise<UpdateResult>;
}