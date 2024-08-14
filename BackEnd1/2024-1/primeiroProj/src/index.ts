type UserId = number | string;

type User ={
    name:string,
    id: UserId
}

const user: User = {
    name: "Fravo",
    id: "925"
}

enum DiasSemana{
    SEXTA = "Sexta-feira",
    SABADO = "Sábado-feira",
    DOMINGO = "Domingão"
}
