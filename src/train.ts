//TASK M

// Array ichidagi har bir raqam uchun raqamning o'zi va uning kvadratidan tashkil topgan object hosil qilib qaytarsin.

// Masalan: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, ...]

function getSquareNumbers(list: number[]) {
    for (let i = 0; i < list.length; i++) {
        console.log(`number: ${list[i]}, square: ${list[i] * list[i]} `);
    }

}
getSquareNumbers([1, 2, 3]);

//TASK-L
// function reverseSentence(text: string) {
//     let words = text.split(" ");
//     let result = "";

//     for (let i of words) {
//         let reversed = i
//             .split("")
//             .reverse()
//             .join("") + " ";

//         result = result + reversed;
//     }

//     console.log(result);
// }

// reverseSentence("we like coding!");