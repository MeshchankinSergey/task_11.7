let minValue = parseInt(prompt('Минимальное знание числа для игры, но не меньше чем -999', '0'));
let maxValue = parseInt(prompt('Максимальное знание числа для игры, но не больше чем 999', '100'));

minValue < -999 ? minValue = -999 : minValue > 999 ? minValue = 999 : minValue = minValue;
maxValue < -999 ? maxValue = -999 : maxValue > 999 ? maxValue = 999 : maxValue = maxValue;

if (Number.isNaN(minValue) || Number.isNaN(maxValue)) {
    minValue = 0;
    maxValue = 100
}

alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

let ones = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
let tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
let teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];


function convert_hundreds(answerNumber) {
    if (answerNumber > 0) {
        if (answerNumber > 99) {
            return hundreds[Math.floor(answerNumber / 100)] + " " + convert_tens(answerNumber % 100);
        } else if (answerNumber === 0){
            return 0;
        } else {
            return convert_tens(answerNumber);
        }
    } else {
        if (-answerNumber > 99) {
            return 'минус ' + hundreds[Math.floor(-answerNumber / 100)] + " " + convert_tens(answerNumber % 100);
        } else if (answerNumber === 0){
            return 0;
        } else {
            return 'минус ' + convert_tens(answerNumber);
        }
    }
}
function convert_tens(answerNumber) {
    if (answerNumber > 0) {
        if (answerNumber < 10) return ones[answerNumber];
        else if (answerNumber >= 10 && answerNumber < 20) return teens[answerNumber - 10];
        else {
            return tens[Math.floor(answerNumber / 10)] + " " + ones[answerNumber % 10];
            }
    } else {
        if (-answerNumber < 10) return ones[-answerNumber];
        else if (-answerNumber >= 10 && -answerNumber < 20) return teens[-answerNumber - 10];
        else {
            return tens[Math.floor(-answerNumber / 10)] + " " + ones[-answerNumber % 10];
        }
    }
} 

const orderNumberField = document.getElementById("orderNumberField");
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${convert_hundreds(answerNumber)}?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    document.location.reload();
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            let answerPhrases = [
                `Вы загадали неправильное число!\n\u{1F914}`,
                `Я в растерянности..\n\u{1F92F}`,
                `Я сдаюсь..\n\u{1F92F}`
            ];
            let answerPhrase = answerPhrases[Math.floor(Math.random() * answerPhrases.length)];
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            let questionPhrases = [
                `Да это легко! Вы загадали ${convert_hundreds(answerNumber)}?`,
                `Наверное, это число ${convert_hundreds(answerNumber)}?`,
                `Вы загадали число ${convert_hundreds(answerNumber)}?`
            ];
            let questionPhrase = questionPhrases[Math.floor(Math.random() * questionPhrases.length)];
            orderNumberField.innerText = orderNumber;
            answerField.innerText = questionPhrase;
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue - 1) {
            answerPhrases = [
                `Вы загадали неправильное число!\n\u{1F914}`,
                `Я в растерянности..\n\u{1F92F}`,
                `Я сдаюсь..\n\u{1F92F}`
            ];
            answerPhrase = answerPhrases[Math.floor(Math.random() * answerPhrases.length)];
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            questionPhrases = [
                `Да это легко! Вы загадали ${convert_hundreds(answerNumber)}?`,
                `Наверное, это число ${convert_hundreds(answerNumber)}?`,
                `Вы загадали число ${convert_hundreds(answerNumber)}?`
            ];
            questionPhrase = questionPhrases[Math.floor(Math.random() * questionPhrases.length)];
            orderNumberField.innerText = orderNumber;
            answerField.innerText = questionPhrase;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        let answerFieldPhrases = [
            `Я всегда угадываю\n\u{1F60E}`,
            `Дело техники\n\u{1F609}`,
            `Ловкость рук и никакого мошенничества\n\u{1F917}`
        ];
        let answerFieldPhrase = answerFieldPhrases[Math.floor(Math.random() * answerFieldPhrases.length)];
        answerField.innerText = answerFieldPhrase;
        gameRun = false;
    }
})