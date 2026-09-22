//TASK-L
function reverseSentence(text: string) {
    let words = text.split(" ");
    let result = "";

    for (let i of words) {
        let reversed = i
            .split("")
            .reverse()
            .join("") + " ";

        result = result + reversed;
    }

    console.log(result);
}

reverseSentence("we like coding!");