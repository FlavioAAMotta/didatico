export const API_URL='localhost:3000/api'



export const somarElementos = (...numeros) =>{
    return numeros.reduce((total,atual)=> total + atual, 0);
}

// export default somarElementos;