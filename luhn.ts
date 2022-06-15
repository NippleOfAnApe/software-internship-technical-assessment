import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
const rl = readline.createInterface({ input, output });

const error: number = 0;
const success: number = 42;

function checkLuhn(userInput: string)
{
    let length: number = userInput.length;
    let sum: number = 0;
    let isSecond: boolean = false;
    
    for (let i: number = (length - 1); i >= 0; i--)
    {
        let digit = parseInt(userInput[i], 10);
        
        if (isSecond === true)
        digit *= 2;
        
        if (digit > 9)
        digit -= 9;
        
        sum += digit;
        isSecond = !isSecond;
    }
        return sum % 10 ? error : success;
}

rl.question("Enter a credit card number: ", (answer) =>
{
    let cardNumber: string = answer.replace(/\s/g, "");
    const hasNonDigits: RegExp = /\D/g;

    if (cardNumber.length <= 1 || hasNonDigits.test(cardNumber) == true)
    {
        console.log("❗ Not valid!\tCode: " + error);
        process.exit(error);
    }
    else
    {
        if (checkLuhn(cardNumber) === success)
        {
            console.log("✅ Valid!\tCode: " + success);
            process.exit(success);
        }
        else
        {
            console.log("❗ Not valid!\tCode: " + error);
            process.exit(error);
        }
    }
});