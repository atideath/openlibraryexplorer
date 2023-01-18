import {IBook} from "./IBook";

export interface IAuthor {
    name: string;
    bookCount: number;
    books: IBook[];
    birth_date: number;
    death_date?: number;
}