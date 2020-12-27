//Класс, который представляет сам тест
export default class Quiz {
    constructor(questions, onSuccess = null) {
        //Массив с вопросами
        this.questions = questions;

        //Номер текущего вопроса
        this.current = 0;

        this.onSuccess = onSuccess;
    }

    checkAnswer(index) {
        return this.questions[this.current].answers[index].value == 1;
    }

    getQuestion() {
        const id = parseInt(Math.random() * this.questions.length);
        this.current = id;
        return this.questions[id];
    }
    result(func) {
        this.onSuccess = func;
    }
}