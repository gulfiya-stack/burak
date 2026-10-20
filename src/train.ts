// TASK V

// Stringdagi har bir harf necha marta takrorlanganini object sifatida qaytarsin.

// Masalan: countChars("hello") return {h: 1, e: 1, l: 2, o: 1}

function countChars(a: string) {
    const res = a.split("");
    const frequency = res.reduce<Record<string, number>>((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    console.log(frequency);
    // const chars = a.split("");
    // const result: Record<string, number> = {};
    // for (let i = 0; i < chars.length; i++) {
    //     let one = chars[i]
    //     if (result[one] === undefined) {
    //         result[one] = 1;
    //     } else {
    //         result[one] = result[one] + 1;
    //     }
    // }
    // console.log(result);
    // return result;

}
countChars("hello");

// TASK T

// Ikkita arrayni qabul qilib, ularni birlashtirib tartiblangan holda qaytarsin.

// Masalan: mergeSortedArrays([0, 3, 4], [4, 6]) return [0, 3, 4, 4, 6]

// function mergeSortedArrays(array1: number[], array2: number[]): number[] {
//     let result: number[] = [];

//     for (let i = 0; i < array1.length; i++) {
//         result.push(array1[i]);
//     }

//     for (let i = 0; i < array2.length; i++) {
//         result.push(array2[i]);
//     }
//     console.log(result.sort((a, b) => a - b));
//     return result;
// }

// mergeSortedArrays([0, 3, 4], [4, 6]);

// [0, 3, 4, 4, 6]

// TASK S

// Array ichidagi tushib qolgan sonni topib qaytarsin.

// Masalan: missingNumber([3, 0, 1]) return 2

// function missingNumber(arr: number[]) {

//     for (let i = 0; i <= arr.length; i++) {
//         if (!arr.includes(i)) {
//             console.log("The missing number =", i);
//             return i;
//         }
//     }
// }

// missingNumber([3, 0, 1]);



// TASK R

// "1 + 2" ko'rinishidagi stringni hisoblab number qaytarsin.

// Masalan: calculate("1 + 3") return 4

// function calculate(a: string) {
//     let res = a.split("");
//     let total = 0;

//     for (let i = 0; i < a.length; i++) {
//         if (res[i] >= "0" && res[i] <= "9") {
//             let number = Number(res[i]);
//             total = total + number;
//         }
//     }

//     console.log("Total:", total);
//     return total;
// }

// calculate("1 + 3");
// TASK Q

// Objectda berilgan string propertysi borligini tekshirsin.

// Masalan: hasProperty({name: "BMW"}, "name") return true

// function hasProperty(
//     obj: { [key: string]: any },
//     name: string
// ): boolean {
//     const keys = Object.keys(obj);

//     for (let i = 0; i < keys.length; i++) {
//         if (keys[i] === name) {
//             console.log("True");
//             return true;
//         }
//     }
//     console.log("False");
//     return false;
// }

// hasProperty({ name: "BMW" }, "name");

// Task-P
// Objectni nested array sifatida convert qilib qaytarsin.

// Masalan: objectToArray({a: 10, b: 20}) return [["a", 10], ["b", 20]]
// function objectToArray(a: { [key: string]: any }) {
//     let list: any[] = [];
//     const keys = Object.keys(a);
//     for (let i = 0; i < keys.length; i++) {

//         list.push([keys[i], a[keys[i]]]);
//     }
//     console.log(list);
//     return list;
// }
// objectToArray({ a: 10, b: 20 });




// Task -O
// function calculateSumOfNumbers(list: any[]) {
//     let sum = 0;

//     for (let i = 0; i < list.length; i++) {
//         if (typeof list[i] === "number") {
//             sum = sum + list[i];
//         }
//     }

//     console.log(sum);
// }

// calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]);

/*
Project Standards
-Logging Standards
- Naming standards
   function, methods, variables => CAMEL case --- goHome
   class => PASCAL case --- MemberService
   folder, file => KEBAB case
   css => SNAKE   --- button_style
- Error handling
*/
/**
Traditional API -> API
Rest API
GraphQL API
 */

/**
Traditional Frontend Development (FD)
==> SSR (Adminka) => EJS
Modern Frontend Development
===> SPA (Users) => React Library
 */


// TASK N

// Stringni palindrom ekanligini aniqlab true yoki false qaytarsin.

// Masalan: palindromCheck("dad") return true

// function palindromCheck(text: string): boolean {
//     const result = text.toLowerCase();


//     const reversed = result
//         .split("")
//         .reverse()
//         .join("");
//     if (result === reversed) {
//         console.log("True");
//         return true;

//     }
//     else {
//         console.log("False");
//         return false;

//     }
// }

// palindromCheck("dad");
// palindromCheck("Kayak");
// palindromCheck("Panama")


//TASK M

// Array ichidagi har bir raqam uchun raqamning o'zi va uning kvadratidan tashkil topgan object hosil qilib qaytarsin.

// Masalan: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, ...]

// function getSquareNumbers(list: number[]) {
//     for (let i = 0; i < list.length; i++) {
//         console.log(`number: ${list[i]}, square: ${list[i] * list[i]} `);
//     }

// }
// getSquareNumbers([1, 2, 3]);

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


