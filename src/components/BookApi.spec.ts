import {BookApi} from "./BookApi";

describe("BookApi Spec", () => {
    global.fetch = jest.fn() as jest.Mock;

    beforeEach(() => {
        jest.mocked(fetch).mockClear();
    });

    it('Testing fetch call', async () => {
        jest.mocked(fetch).mockImplementation((): Promise<any> => {
            return Promise.resolve({
                text() {
                    return Promise.resolve(JSON.stringify({
                        "numFound": 1,
                        "start": 0,
                        "numFoundExact": true,
                        "docs": [
                            {
                                "key": "OL4326311A",
                                "type": "author",
                                "name": "Steven Spielberg",
                                "alternate_names": [
                                    "Spielberg, Steven",
                                    "STEVEN SPIELBERG"
                                ],
                                "birth_date": "1947",
                                "top_work": "Close encounters of the third kind",
                                "work_count": 26,
                                "top_subjects": [
                                    "Accessible book",
                                    "Protected DAISY",
                                    "Films",
                                    "Novelization",
                                    "Movies",
                                    "Motion Pictures",
                                    "Films, cinema",
                                    "Films dramatiques",
                                    "Fiction in English",
                                    "World War, 1939-1945"
                                ],
                                "_version_": 1735696453795315726
                            }
                        ]
                    }));
                }
            });
        });

        const author = await BookApi.fetchAuthorData("Steven Spielberg");
        expect(jest.mocked(fetch).mock.calls.length).toBe(1);
        expect(author).toBeDefined();
        expect(author?.length).toBe(1);
        if(author) {
            expect(author[0].name).toBe("Steven Spielberg");
            expect(author[0].books.length).toBe(1);
            expect(author[0].books[0].key).toBe("OL4326311A");
        }
    });

    it('Testing print author books', async () => {
        const expectedAuthor = "Steven Spielberg";
        const consoleSpy = jest.spyOn(console, 'log');
        jest.mocked(fetch).mockImplementation((): Promise<any> => {
            return Promise.resolve({
                text() {
                    return Promise.resolve(JSON.stringify({
                        "numFound": 1,
                        "start": 0,
                        "numFoundExact": true,
                        "docs": [
                            {
                                "key": "OL4326311A",
                                "type": "author",
                                "name": "Steven Spielberg",
                                "alternate_names": [
                                    "Spielberg, Steven",
                                    "STEVEN SPIELBERG"
                                ],
                                "birth_date": "1947",
                                "top_work": "Close encounters of the third kind",
                                "work_count": 26,
                                "top_subjects": [
                                    "Accessible book",
                                    "Protected DAISY",
                                    "Films",
                                    "Novelization",
                                    "Movies",
                                    "Motion Pictures",
                                    "Films, cinema",
                                    "Films dramatiques",
                                    "Fiction in English",
                                    "World War, 1939-1945"
                                ],
                                "_version_": 1735696453795315726
                            },{
                                "key": "OL4326311B",
                                "type": "author",
                                "name": "Steven Spielberg",
                                "alternate_names": [
                                    "Spielberg, Steven",
                                    "STEVEN SPIELBERG"
                                ],
                                "birth_date": "1947",
                                "top_work": "The Last Day",
                                "work_count": 26,
                                "top_subjects": [
                                    "Accessible book",
                                    "Protected DAISY",
                                    "Films",
                                    "Novelization",
                                    "Movies",
                                    "Motion Pictures",
                                    "Films, cinema",
                                    "Films dramatiques",
                                    "Fiction in English",
                                    "World War, 1939-1945"
                                ],
                                "_version_": 1735696453795315726
                            }
                        ]
                    }));
                }
            });
        });

        await BookApi.searchAndPrintAuthorsBook(expectedAuthor);
        expect(jest.mocked(fetch).mock.calls.length).toBe(1);
        expect(consoleSpy).toHaveBeenCalledWith(`Author name: ${expectedAuthor}`);
        expect(consoleSpy).toHaveBeenCalledWith(`Books count: 2`);
        expect(consoleSpy).toHaveBeenCalledWith(`    - Close encounters of the third kind (OL4326311A)`);
        expect(consoleSpy).toHaveBeenCalledWith(`    - The Last Day (OL4326311B)`);
    });
    it('Testing print author without books', async () => {
        const expectedAuthor = "Mark Johns";
        const consoleSpy = jest.spyOn(console, 'log');
        jest.mocked(fetch).mockImplementation((): Promise<any> => {
            return Promise.resolve({
                text() {
                    return Promise.resolve(JSON.stringify({
                        "numFound": 1,
                        "start": 0,
                        "numFoundExact": true,
                        "docs": []
                    }));
                }
            });
        });

        await BookApi.searchAndPrintAuthorsBook(expectedAuthor);
        expect(jest.mocked(fetch).mock.calls.length).toBe(1);
        expect(consoleSpy).toHaveBeenCalledWith(`We could not find any author`);
    });
    it('Testing map to author with invalid data', async () => {
        const expectedAuthor = "Mark Johns";
        const consoleSpy = jest.spyOn(console, 'error');
        jest.mocked(fetch).mockImplementation((): Promise<any> => {
            return Promise.resolve({
                text() {
                    return Promise.resolve(JSON.stringify({
                        "numFound": 1,
                        "start": 0,
                        "numFoundExact": true,
                        "docs": "Not exist"
                    }));
                }
            });
        });

        await BookApi.searchAndPrintAuthorsBook(expectedAuthor);
        expect(jest.mocked(fetch).mock.calls.length).toBe(1);
        expect(consoleSpy).toHaveBeenCalledWith(`Failed to map response!`);
    });

    it('Testing map to author with empty response', async () => {
        const expectedAuthor = "Mark Johns";
        const consoleSpy = jest.spyOn(console, 'error');
        jest.mocked(fetch).mockImplementation((): Promise<any> => {
            return Promise.resolve({
                text() {
                    return Promise.resolve(JSON.stringify({}));
                }
            });
        });

        await BookApi.searchAndPrintAuthorsBook(expectedAuthor);
        expect(jest.mocked(fetch).mock.calls.length).toBe(1);
        expect(consoleSpy).toHaveBeenCalledWith(`Failed to map response!`);
    });
});