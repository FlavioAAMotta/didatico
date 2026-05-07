interface Registro {
  id: number;
  nomeAluno: string;
  disciplina: string;
  nota: number;
  semestre: string;
}

const registros: Registro[] = [
  { id: 1, nomeAluno: "Ana Silva", disciplina: "Matemática", nota: 85, semestre: "2024.1" },
  { id: 2, nomeAluno: "João Santos", disciplina: "Português", nota: 65, semestre: "2024.1" },
  { id: 3, nomeAluno: "Maria Costa", disciplina: "História", nota: 92, semestre: "2024.1" },
  { id: 4, nomeAluno: "Pedro Lima", disciplina: "Matemática", nota: 45, semestre: "2024.1" },
  { id: 5, nomeAluno: "Ana Silva", disciplina: "Português", nota: 78, semestre: "2024.1" },
  { id: 6, nomeAluno: "João Santos", disciplina: "História", nota: 88, semestre: "2024.1" },
  { id: 7, nomeAluno: "Maria Costa", disciplina: "Matemática", nota: 95, semestre: "2024.2" },
  { id: 8, nomeAluno: "Pedro Lima", disciplina: "Português", nota: 55, semestre: "2024.2" },
  { id: 9, nomeAluno: "Carlos Rocha", disciplina: "Física", nota: 72, semestre: "2024.2" },
  { id: 10, nomeAluno: "Lucia Mendes", disciplina: "Química", nota: 89, semestre: "2024.2" }
];

// Filter

// Exemplo 1
const aprovados = registros.filter(r => r.nota >= 70);
console.log("\n1) Registros com nota >= 70:");
console.log(aprovados);

// Exemplo 2
const registrosAna = registros.filter(r => r.nomeAluno === "Ana Silva");
console.log("\n2) Todos os registros da Ana Silva:");
console.log(registrosAna);

// Exemplo 3
const matematicaReprovados = registros.filter(r => 
  r.disciplina === "Matemática" && r.nota < 70
);
console.log("\n3) Registros de Matemática com nota < 70:");
console.log(matematicaReprovados);

// Exemplo 4
const semestre2024_2 = registros.filter(r => r.semestre === "2024.2");
console.log("\n4) Registros do semestre 2024.2:");
console.log(semestre2024_2);



// find

// Exemplo 5
const primeiroExcelente = registros.find(r => r.nota > 90);
console.log("\n5) Primeiro registro com nota > 90:");
console.log(primeiroExcelente);

// Exemplo 6
const buscaJoao = registros.find(r => r.nomeAluno === "João Santos");
console.log("\n6) Primeiro registro do João Santos:");
console.log(buscaJoao);

// Exemplo 7
const buscaPorId = registros.find(r => r.id === 5);
console.log("\n7) Registro com ID 5:");
console.log(buscaPorId);

// Exemplo 8
const naoEncontrado = registros.find(r => r.nota === 100);
console.log("\n8) Busca por nota 100 (não existe):");
console.log(naoEncontrado);



// findIndex

// Exemplo 9
const indiceReprovado = registros.findIndex(r => r.nota < 60);
console.log("\n9) Índice do primeiro registro com nota < 60:");
console.log(`Índice: ${indiceReprovado}`);
console.log("Registro:", registros[indiceReprovado]);

// Exemplo 10
const indiceMaria = registros.findIndex(r => r.nomeAluno === "Maria Costa");
console.log("\n10) Índice do primeiro registro da Maria:");
console.log(`Índice: ${indiceMaria}`);

// Exemplo 11
const indiceInexistente = registros.findIndex(r => r.nomeAluno === "José");
console.log("\n11) Busca por 'José' (não existe):");
console.log(`Índice: ${indiceInexistente}`);



// some

// Exemplo 12
const temNota100 = registros.some(r => r.nota === 100);
console.log("\n12) Existe alguma nota 100?", temNota100);

// Exemplo 13
const temReprovado = registros.some(r => r.nota < 60);
console.log("\n13) Existe algum reprovado (nota < 60)?", temReprovado);

// Exemplo 14
const temFisica = registros.some(r => r.disciplina === "Física");
console.log("\n14) Alguém está cursando Física?", temFisica);

// Exemplo 15
const tem2023 = registros.some(r => r.semestre === "2023.1");
console.log("\n15) Tem registros de 2023.1?", tem2023);



// every

// Exemplo 16
const todosAcima40 = registros.every(r => r.nota >= 40);
console.log("\n16) Todos têm nota >= 40?", todosAcima40);

// Exemplo 17
const todosMesmoSemestre = registros.every(r => r.semestre === "2024.1");
console.log("\n17) Todos são do semestre 2024.1?", todosMesmoSemestre);

// Exemplo 18
const todosAprovados = registros.every(r => r.nota >= 60);
console.log("\n18) Todos estão aprovados (nota >= 60)?", todosAprovados);



// map

// Exemplo 19
const nomes = registros.map(r => r.nomeAluno);
console.log("\n19) Lista de nomes:");
console.log(nomes);

// Exemplo 20
const descricoes = registros.map(r => 
  `${r.nomeAluno} - ${r.disciplina}: ${r.nota}`
);
console.log("\n20) Descrições dos registros:");
descricoes.forEach(r => console.log(r));

// Exemplo 21
const resumo = registros.map(r => ({
  aluno: r.nomeAluno,
  situacao: r.nota >= 70 ? "Aprovado" : "Reprovado"
}));
console.log("\n21) Resumo de situações:");
console.log(resumo);



// reduce

// Exemplo 22
const somaNotas = registros.reduce((soma, r) => soma + r.nota, 0);
console.log("\n22) Soma de todas as notas:", somaNotas);

// Exemplo 23
const mediaGeral = somaNotas / registros.length;
console.log("\n23) Média geral:", mediaGeral.toFixed(2));



// includes

// Exemplo 24
const disciplinasUnicas = [...new Set(registros.map(r => r.disciplina))];
console.log("\n24) Disciplinas únicas:", disciplinasUnicas);

// Exemplo 25
const temMatematica = disciplinasUnicas.includes("Matemática");
console.log("\n25) Tem Matemática na lista?", temMatematica);

// Exemplo 26
const temIngles = disciplinasUnicas.includes("Inglês");
console.log("\n26) Tem Inglês na lista?", temIngles);




// Exemplos Combinados

// Exemplo 27
const aprovadosOrdenados = registros
  .filter(r => r.nota >= 70)
  .map(r => r.nomeAluno)
  .sort();
console.log("\n28) Alunos aprovados (ordenados):");
console.log(aprovadosOrdenados);

// Exemplo 28
const anaTemNotaAlta = registros
  .filter(r => r.nomeAluno === "Ana Silva")
  .some(r => r.nota > 80);
console.log("\n28 Ana Silva tem alguma nota > 80?", anaTemNotaAlta);