document.getElementById("generate").addEventListener("click", function() {
    var columns = parseInt(document.getElementById("columns").value);
    var rows = parseInt(document.getElementById("rows").value);
    var correct = document.getElementById("correct").value;
    var correctNum = parseInt(document.getElementById("correct_num").value);
    var wordList = document.getElementById("word").value.replace(/\s/g, "").split(",");
    
    // Check if all words have the same length
    var wordLength = wordList[0].length;
    var allWordsSameLength = wordList.every(function(word) {
        return word.length === wordLength;
    });
    
    if (!allWordsSameLength) {
        alert("단어 목록에 있는 모든 단어는 같은 글자수를 가져야 합니다.");
        return;
    }

    if (correct.length !== wordLength) {
        alert("정답의 글자수는 단어 목록의 글자수와 같아야 합니다.");
        return;
    }

    var index = wordList.indexOf(correct);
    if (index > -1) {
        wordList.splice(index, 1);
    }
    
    var randomWordList = [];
    
    // Generate random word list
    for (var i = 0; i < columns * rows; i++) {
        var randomIndex = Math.floor(Math.random() * wordList.length);
        randomWordList.push(wordList[randomIndex]);
    }
    
    // Insert correct answers at random positions
    for (var j = 0; j < correctNum; j++) {
        var randomPosition = Math.floor(Math.random() * randomWordList.length);
        randomWordList[randomPosition] = correct;
    }
    
    // Format the output string with line breaks
    var output = "";
    for (var k = 0; k < randomWordList.length; k++) {
        if (k % columns === 0 && k !== 0) {
            output += "<br>";
        }
        if (randomWordList[k] === correct) {
            output += "<span style='color:red'>" + randomWordList[k] + "</span>";
        } else {
            output += randomWordList[k];
        }
    }
    
    document.getElementById("output").innerHTML = output;
});

document.getElementById("copy").addEventListener("click", function() {
    var output = document.getElementById("output");
    var range = document.createRange();
    range.selectNodeContents(output);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("생성된 문자열이 복사되었습니다.");
});

document.getElementById("copy_without_return").addEventListener("click", function() {
    var output = document.getElementById("output").innerText;
    var textarea = document.createElement("textarea");
    textarea.value = output.replace(/\n/g, "");
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("생성된 문자열이 줄내림 없이 복사되었습니다.");
});