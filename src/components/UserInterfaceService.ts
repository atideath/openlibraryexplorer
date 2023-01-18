import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export class UserInterfaceService {
    static async getUserInput () {
        const rl = readline.createInterface({input, output});
        const answer = await rl.question('Which author\'s books would you like to find? ');
        rl.close();
        return answer;
    }
}