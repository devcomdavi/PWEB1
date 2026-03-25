"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exam = exports.Weight = exports.Answer = void 0;
class Answer {
    nomeAluno;
    respostas;
    constructor(nomeAluno, vetorRespostas) {
        this.nomeAluno = nomeAluno;
        this.respostas = vetorRespostas;
    }
    getRespostas() {
        return this.respostas;
    }
}
exports.Answer = Answer;
class Weight {
    peso;
    constructor(peso) {
        this.peso = peso;
    }
    getPeso() {
        return this.peso;
    }
}
exports.Weight = Weight;
class Exam {
    officialAnswer; // respostas do gabarito
    weight; // pesos das questões da prova
    studentsAnswer; // respostas dos estudantes
    constructor(answer, weight) {
        this.officialAnswer = answer;
        this.weight = weight;
        this.studentsAnswer = Array();
    }
    ;
    add(exam) {
        this.studentsAnswer.push(exam);
    }
    calcularNota(estudante) {
        let nota = 0;
        for (let i = 0; i < this.officialAnswer.getRespostas().length; i++) {
            if (estudante.getRespostas()[i] === this.officialAnswer.getRespostas()[i]) {
                nota += this.weight.getPeso()[i];
            }
        }
        return nota;
    }
    avg() {
        let cont = 0;
        let sum = 0;
        let media = 0;
        if (this.studentsAnswer.length === 0)
            throw 'Não há notas cadastradas!';
        for (let i = 0; i < this.studentsAnswer.length; i++) {
            sum += this.calcularNota(this.studentsAnswer[i]);
            cont++;
        }
        media = sum / cont;
        return media;
    }
    min(quantidadeNotas) {
        let notas = [];
        let notasMin = [];
        for (const estudante of this.studentsAnswer) {
            notas.push(this.calcularNota(estudante));
        }
        notas.sort((a, b) => a - b);
        for (let i = 0; i < quantidadeNotas; i++) {
            notasMin.push(notas[i]);
        }
        return notasMin;
    }
    max(quantidadeNotas) {
        let notas = [];
        let notasMax = [];
        for (const estudante of this.studentsAnswer) {
            notas.push(this.calcularNota(estudante));
        }
        notas.sort((a, b) => b - a);
        for (let i = 0; i < quantidadeNotas; i++) {
            notasMax.push(notas[i]);
        }
        return notasMax;
    }
    lt(limiteSuperior) {
        let notasAbaixo = [];
        for (let i = 0; i < this.studentsAnswer.length; i++) {
            if (this.calcularNota(this.studentsAnswer[i]) < limiteSuperior)
                notasAbaixo.push(this.calcularNota(this.studentsAnswer[i]));
        }
        return notasAbaixo;
    }
    gt(limiteInferior) {
        let notasAcima = [];
        for (let i = 0; i < this.studentsAnswer.length; i++) {
            if (this.calcularNota(this.studentsAnswer[i]) > limiteInferior)
                notasAcima.push(this.calcularNota(this.studentsAnswer[i]));
        }
        return notasAcima;
    }
}
exports.Exam = Exam;
