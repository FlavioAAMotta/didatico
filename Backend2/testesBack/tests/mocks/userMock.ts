import { User, USER_ROLES } from "../../src/model/User";

export const userMock = new User(
    "id_mockado",
    "flavio",
    "flavio@lab.com",
    "flavio123",
    USER_ROLES.NORMAL
)

export const userMock2 = new User(
    "id_mockado2",
    "flaivo",
    "flaivo@lab.com",
    "flaivo123",
    USER_ROLES.ADMIN
)