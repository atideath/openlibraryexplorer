import {UserInterfaceService} from "./components/UserInterfaceService";
import {BookApi} from "./components/BookApi";

(async () => {
    const userInput: string = await UserInterfaceService.getUserInput();
    BookApi.searchAndPrintAuthorsBook(userInput);
})();