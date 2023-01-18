import {DocsType} from "../model/DocsType";
import {IAuthor} from "../model/IAuthor";
import {IBook} from "../model/IBook";

export class BookApi {
    public static async searchAndPrintAuthorsBook(author: string) {
        try {
            const response = await fetch(`http://openlibrary.org/search/authors.json?q=${author}`);
            const res = await response.text();
            const authors: IAuthor[] = this.mapResponseToAuthorType(res);
            this.printAllBookTitles(authors);
        } catch (err) {
            console.error("Fail", err);
        }

    }

    private static printAllBookTitles(docs: IAuthor[]) {
        docs.forEach((value: IAuthor) => {
            console.log(`****************************************`);
            console.log(`Author name: ${value.name}`);
            console.log(`Books count: ${value.bookCount}`);
            console.log(`Books titles: `)
            value.books.forEach(book =>{
                console.log(`    - ${book.title} (${book.key})`);
            })
        })
    }

    private static mapResponseToAuthorType(response: string) {
        let parse = JSON.parse(response);
        let authorsList: DocsType[] = parse.docs.filter((docs: DocsType) => {
            return docs.birth_date !== undefined;
        });

        let authors: IAuthor[] = authorsList.map((value) => {
                let filteredBooksByAuthor: IBook[] = parse.docs.filter((bookValue: DocsType) => bookValue.name === value.name)
                    .map((bookValue: DocsType) => {
                        return {
                            title: bookValue.top_work,
                            key: bookValue.key
                        }
                    });

                let author: IAuthor = {
                    name: value.name,
                    birth_date: value.birth_date,
                    bookCount: filteredBooksByAuthor.length,
                    books: filteredBooksByAuthor
                };

                if(typeof value.death_date !== "undefined") {
                    author.death_date = value.death_date;
                }
                return author;
            }
        );

        return authors;

    }


}