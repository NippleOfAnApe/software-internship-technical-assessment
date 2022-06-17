import { testCases } from './tests'
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
const rl = readline.createInterface({ input, output });

const error: number = 42;
const success: number = 0;

function checkLuhn(userInput: string) : number
{
    let sum: number = 0;
    let isSecond: boolean = false;
    
    for (let i: number = (userInput.length - 1); i >= 0; i--)
    {
        let digit = parseInt(userInput[i], 10);
        
        if (isSecond === true)
        digit *= 2;
        
        if (digit > 9)
        digit -= 9;
        
        sum += digit;
        isSecond = !isSecond;
    }
    if (userInput.length <= 1)
    return error;

    return sum % 10 === 0 ? success : error;
}

// rl.question("Enter a credit card number: ", (answer: string) =>
// {
//     let cardNumber: string = answer.replace(/\s/g, "");
//     const hasNonDigits: RegExp = /\D/g;

//     if (cardNumber.length <= 1 || hasNonDigits.test(cardNumber) == true)
//     {
//         console.log("❗ Not valid!\tCode: " + error);
//         process.exit(error);
//     }
//     else
//     {
//         if (checkLuhn(cardNumber))
//         {
//             console.log("✅ Valid!\tCode: " + success);
//             process.exit(success);
//         }
//         else
//         {
//             console.log("❗ Not valid!\tCode: " + error);
//             process.exit(error);
//         }
//     }
// });

for (const { input, expected, message } of testCases) {
    const status: number = checkLuhn(input);

    if (![0, 42].includes(status)) {
        console.log(`❌  Invalid exit code ${status} with input ${input}!`)
        process.exit(1)
    }

    if (status !== expected) {
        console.log(`❌  Input: "${input}", Status: ${status}, Expected: ${expected}\nℹ  Test description: ${message}`)
        process.exit(1)
    }

    console.log(`✅  Input: "${input}", Status: ${status}`)
}

console.log('🎊  All tests passed successfully!')