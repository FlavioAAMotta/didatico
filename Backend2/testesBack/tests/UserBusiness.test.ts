/**
 * Teste 1: Erro que deve retornar quando o nome está vazio
 * Teste 2: Erro que deve retornar quando o email é inválido
 * Teste 3: Erro que deve retornar quando a senha é inválida
 * Teste 4: Erro que deve retornar quando o tipo de usuário é inválido
 * Teste 5: Sucesso no cadastro e verificação do token de acesso 
 */


import { UserBusiness } from "../src/business/UserBusiness"
import { CustomError } from "../src/errors/CustomError"
import { HashGeneratorMock } from "./mocks/hashGeneratorMock"
import { IdGeneratorMock } from "./mocks/idGeneratorMock"
import { TokenGeneratorMock } from "./mocks/tokenGeneratorMock"
import { UserDatabaseMock } from "./mocks/userDatabaseMock"

const userBusinessMock = new UserBusiness(
    new UserDatabaseMock() as any,
    new IdGeneratorMock(),
    new TokenGeneratorMock(),
    new HashGeneratorMock()
)

describe("Teste de signUp", () => {
    test("Erro que deve retornar quando o nome está vazio", async () => {
        expect.assertions(2)
        try {
            await userBusinessMock.signup(
                "",
                "flavio@fravo.com",
                "flavio123",
                "ADMIN"
            )
        } catch (error) {
            //422, "Missing input"
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Missing input")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    })
    test("Erro que deve retornar quando o email é inválido", async () => {
        expect.assertions
        try {
            await userBusinessMock.signup(
                "Flaivo",
                "flaviofravo.com",
                "flavio123",
                "ADMIN"
            )
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Invalid email")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    })
    test("Erro que deve retornar quando a senha é inválida", async () => {
        expect.assertions
        try {
            await userBusinessMock.signup(
                "Flaivo",
                "flavio@fravo.com",
                "12345",
                "ADMIN"
            )
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Invalid password")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    })
    test("Erro que deve retornar quando o tipo de usuário é inválido", async () => {
        expect.assertions
        try {
            await userBusinessMock.signup(
                "Flaivo",
                "flavio@fravo.com",
                "123453",
                "adm"
            )
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Invalid user role")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    })
    test("Sucesso no cadastro e verificação do token de acesso", async () => {
        expect.assertions
        try {
            const accessToken = await userBusinessMock.signup(
                "Flaivo",
                "flavio@fravo.com",
                "123453",
                "ADMIN"
            )
            expect(accessToken).toEqual({
                "accessToken": "token_mockado"
            })
        } catch (error) {
            console.log(error)
        }
    })
})

/**
 * Teste 1: Erro que deve retornar quando o email fornecido não existe 
 * Teste 2: Erro que deve retornar quando a senha está errada
 * Teste 3: Sucesso no login e verificação do token de acesso
 */

describe("Teste de login", () => {
    test("Erro que deve retornar quando o email fornecido não existe", async () => {
        expect.assertions
        try {
            await userBusinessMock.login("fla@fravo.com", "flavio123")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Invalid credentials")
                expect(error.statusCode).toEqual(401)
            } else {
                console.log(error)
            }
        }
    })
    test("Erro que deve retornar quando a senha está errada", async () => {
        expect.assertions
        try {
            await userBusinessMock.login("flavio@fravo.com", "flavio321")
        } catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Invalid credentials")
                expect(error.statusCode).toEqual(401)
            } else {
                console.log(error)
            }
        }
    })
    test("Sucesso no login e verificação do token de acesso", async () => {
        expect.assertions
        try {
            const result = await userBusinessMock.login("flavio@fravo.com", "flavio123")
            expect(result).toEqual({ "accessToken": "token_mockado" })
        } catch (error) {
            console.log(error)
        }
    })
})