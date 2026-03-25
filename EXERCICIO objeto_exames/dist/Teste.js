"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exam_1 = require("./Exam");
// Criar o gabarito
const gabarito = new Exam_1.Answer("Gabarito Oficial", ["A", "B", "C", "D", "E"]);
// Definir os pesos das questões
const pesos = new Exam_1.Weight([2, 2, 2, 2, 2]);
// Instanciar o exame com o gabarito e os pesos
const exame = new Exam_1.Exam(gabarito, pesos);
// Criar respostas dos alunos
const aluno1 = new Exam_1.Answer("João", ["A", "B", "C", "A", "E"]); // Errou a 4 (nota 8)
const aluno2 = new Exam_1.Answer("Maria", ["A", "B", "B", "D", "E"]); // Errou a 3 (nota 8)
const aluno3 = new Exam_1.Answer("Pedro", ["B", "A", "D", "E", "C"]); // Errou todas (nota 0)
const aluno4 = new Exam_1.Answer("Ana", ["A", "B", "C", "D", "E"]); // Acertou todas (nota 10)
// Adicionar os alunos ao exame
exame.add(aluno1);
exame.add(aluno2);
exame.add(aluno3);
exame.add(aluno4);
// Testar o cálculo de notas
console.log("--- Notas Individuais ---");
console.log(`Nota de João: ${exame.calcularNota(aluno1)}`);
console.log(`Nota de Maria: ${exame.calcularNota(aluno2)}`);
console.log(`Nota de Pedro: ${exame.calcularNota(aluno3)}`);
console.log(`Nota de Ana: ${exame.calcularNota(aluno4)}`);
// Testar a média
console.log("\n--- Média da Turma ---");
console.log(`Média: ${exame.avg()}`);
// Testar as maiores e menores notas
console.log("\n--- Análise das Notas ---");
console.log("Duas maiores notas (max 2):", exame.max(2));
console.log("Duas menores notas (min 2):", exame.min(2));
// Testar notas maiores (gt) e menores (lt)
console.log("\n--- Filtros de Notas ---");
console.log("Notas maiores que 7 (gt 7):", exame.gt(7)); // deve retornar [8, 8, 10]
console.log("Notas menores que 5 (lt 5):", exame.lt(5)); // deve retornar [0]
