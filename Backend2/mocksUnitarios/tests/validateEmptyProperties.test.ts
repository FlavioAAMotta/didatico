import { validateEmptyProperties } from "../src/validateEmptyProperties"

/**
 * {
 *  isValid: false
 *  errors: [
 *      {
 *          key: 'name',
 *          value: ''
 *      }
 *  ]
 * }
 */

describe("Unitary validateEmptyProperties test",()=>{
    test("Should return isValid false on empty string property",()=>{
        const emptyStringProperty = {name:""}
        const result = validateEmptyProperties(emptyStringProperty)
        expect(result.isValid).toBe(false)
        expect(result.errors.length).toBe(1)
        expect(result.errors[0]).toEqual({key: 'name',value: ''})
    })

    test("Should return isValid false on 0 number property",()=>{
        const emptyNumberProperty = {
            name:"Flaivo",
            age:0
        }

        const result = validateEmptyProperties(emptyNumberProperty)
        expect(result.isValid).toBe(false)
        expect(result.errors.length).toBe(1)
        expect(result.errors[0]).toEqual({key: 'age',value: 0})
    })

    test("Should return isValid false on undefined property",()=>{
        const undefinedProperty = {email: undefined, age:19}
        const result = validateEmptyProperties(undefinedProperty)
        expect(result.isValid).toBe(false)
        expect(result.errors.length).toBe(1)
    })

    test("Should return isValid false on null property",()=>{
        const nullProperty = {name:null}
        const result = validateEmptyProperties(nullProperty)
        expect(result.isValid).toBe(false)
        expect(result.errors.length).toBe(1)
    })

    test("Should return isValid true on 4 valid properties",()=>{
        const validObject = {
            name:"Flaivo",
            age: 19,
            height: -1.78,
            email:"flaivo@lab.com"
        }

        const result = validateEmptyProperties(validObject)
        expect(result.isValid).toBe(true)
        expect(result.errors.length).toBe(0)
    })

    test("Should return isValid false on 4 invalid properties",()=>{
        const invalidObject = {
            name:"",
            age: 0,
            height: undefined,
            email:null
        }

        const result = validateEmptyProperties(invalidObject)
        expect(result.isValid).toBe(false)
        expect(result.errors.length).toBe(4)
    })
})