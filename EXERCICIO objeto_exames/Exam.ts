export class Answer {
    private nomeAluno : string;
    private respostas : string[];
    
    constructor(nomeAluno : string, vetorRespostas : string[]) {
        this.nomeAluno = nomeAluno;
        this.respostas = vetorRespostas;
    }

    public getRespostas() : string[] {
        return this.respostas
    }

}

export class Weight {
    private peso : number[];

    constructor(peso : number[]) {
        this.peso = peso;
    }

    public getPeso() : number[] {
        return this.peso;
    }
}

export class Exam {
    private officialAnswer : Answer; // respostas do gabarito
    private weight : Weight; // pesos das questões da prova
    private studentsAnswer : Array<Answer>; // respostas dos estudantes

    constructor(answer : Answer, weight : Weight) {
        this.officialAnswer = answer;
        this.weight = weight;
        this.studentsAnswer = Array<Answer>();
    };

    public add(exam : Answer) : void{
        this.studentsAnswer.push(exam);
    }

    public calcularNota(estudante : Answer) : number {
        let nota = 0;
        for (let i = 0; i < this.officialAnswer.getRespostas().length; i++) {
            if (estudante.getRespostas()[i] === this.officialAnswer.getRespostas()[i]) {
                nota += this.weight.getPeso()[i];
            }
        }
        return nota;
    }

    public avg() : number {
        let cont : number = 0;
        let sum : number = 0;
        let media : number = 0;

        if (this.studentsAnswer.length === 0)
            throw 'Não há notas cadastradas!';

        for (let i = 0; i < this.studentsAnswer.length; i++) {
            sum += this.calcularNota(this.studentsAnswer[i])
            cont++
        }
        media = sum/cont
        return media;
    }

    public min(quantidadeNotas : number) : Array<number> {
        let notas : Array<number> = [];
        let notasMin : Array<number> = [];
        for(const estudante of this.studentsAnswer) {
            notas.push(this.calcularNota(estudante))
        }
        notas.sort((a,b) => a-b)

        for (let i = 0; i < quantidadeNotas; i++) {
            notasMin.push(notas[i]);
        }
        return notasMin;
    }

    public max(quantidadeNotas : number) : Array<number> {
        let notas : Array<number> = [];
        let notasMax : Array<number> = [];
        for(const estudante of this.studentsAnswer) {
            notas.push(this.calcularNota(estudante))
        }
        notas.sort((a,b) => b-a)

        for (let i = 0; i < quantidadeNotas; i++) {
            notasMax.push(notas[i]);
        }
        return notasMax;
    }

    public lt(limiteSuperior : number) : Array<number> {
        let notasAbaixo : Array<number> = [];
        for (let i = 0; i < this.studentsAnswer.length; i++) {
            if (this.calcularNota(this.studentsAnswer[i]) < limiteSuperior)
                notasAbaixo.push(this.calcularNota(this.studentsAnswer[i]))
        }
        return notasAbaixo;
    }

    public gt(limiteInferior : number) : Array<number> {
        let notasAcima : Array<number> = [];
        for (let i = 0; i < this.studentsAnswer.length; i++) {
            if (this.calcularNota(this.studentsAnswer[i]) > limiteInferior)
                notasAcima.push(this.calcularNota(this.studentsAnswer[i]))
        }
        return notasAcima;
    }

}