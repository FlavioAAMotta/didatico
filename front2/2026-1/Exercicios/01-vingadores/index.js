const herois = [
 { nome: "Tony Stark", codinome: "Homem de Ferro", equipe: "Vingadores", status:"Aposentado", nivelPoder: 95 },
 { nome: "Steve Rogers", codinome: "Capitão América", equipe: "Vingadores", status: "Aposentado", nivelPoder: 90 },
 { nome: "Natasha Romanoff", codinome: "Viúva Negra", equipe: "Vingadores", status: "Falecida", nivelPoder: 85 },
 { nome: "Peter Quill", codinome: "Senhor das Estrelas", equipe: "Guardiões da Galáxia", status: "Ativo", nivelPoder: 80 },
 { nome: "Groot", codinome: "Groot", equipe: "Guardiões da Galáxia", status: "Ativo", nivelPoder: 88 },
 { nome: "Wanda Maximoff", codinome: "Feiticeira Escarlate", equipe: "Vingadores", status: "Ativo", nivelPoder: 100 },
 { nome: "T'Challa", codinome: "Pantera Negra", equipe: "Vingadores", status: "Ativo", nivelPoder: 92 },
];

const vingadores = herois.filter((heroi) =>{
    return heroi.equipe === 'Vingadores'
})
const guardioes = herois.filter((heroi) =>{
    return heroi.equipe === 'Guardiões da Galáxia'
})

const aliancaCosmica = [...vingadores, ...guardioes];