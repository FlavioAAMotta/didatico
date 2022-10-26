import { validateEmptyProperties } from "../src/validateEmptyProperties";

describe("Teste unitário de validateEmptyProperties", () => {
    test("Deve retornar isValid false quando propriedade string vazia",()=>{
        const emptyStringProperty = {name:""}
        const result = validateEmptyProperties(emptyStringProperty)
        expect(result.isValid).toBe(false)
    })
    test("Deve retornar isValid false quando propriedade number for zero",()=>{
        const emptyNumberProperty = {age:0}
        const result = validateEmptyProperties(emptyNumberProperty)
        expect(result.isValid).toBe(false)
        expect(result.errors.length).toBe(1)
    })
    test("Deve retornar isValid false quando propriedade for null",()=>{
        const nullValue:any = null
        const nullProperty = {name:nullValue}
        const result = validateEmptyProperties(nullProperty)
        expect(result.isValid).toBe(false)
    })
    test("Deve retornar isValid false quando propriedade for undefined",()=>{
        const undefinedValue:any = undefined
        const undefinedProperty = {name:undefinedValue}
        const result = validateEmptyProperties(undefinedProperty)
        expect(result.isValid).toBe(false)
    })
    test("Deve retornar isValid false quando propriedade tiver um outro objeto com propriedade vazia",()=>{
        const emptyObject = {
            name:"Flávio",
            street:"", 
            number:"",
            email:""
        }
        const result = validateEmptyProperties(emptyObject)
        expect(result.isValid).toBe(false)
        expect(result.errors.length).toBe(3)
    })
    test("Deve retornar isValid false quando propriedade tiver um outro objeto com propriedade vazia",()=>{
        const validObject = {
            name:"Flávio",
            street:"Av1",
            number:8,
            email:"flavio@fla.com"
        }
        const result = validateEmptyProperties(validObject);
        expect(result.isValid).toBe(true)
    })

});
// Objetos com (string vazia, number = 0, null, undefined, {name:"Flabio", idade:0})

// test("",()=>{})