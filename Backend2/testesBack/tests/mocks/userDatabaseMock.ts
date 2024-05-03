import { User } from "../../src/model/User";
import { userMock, userMock2 } from "./userMock";

export class UserDatabaseMock {
    public async createUser(user: User): Promise<void> { }

    public async getUserById(id: string): Promise<User | undefined> {
        if (id === 'id_mockado') {
            return userMock
        } else if (id === 'id_mockado2') {
            return userMock2
        } else {
            undefined
        }
    }
    public async getUserByEmail(email: string): Promise<User | undefined> {
        if (email === 'flavio@lab.com') {
            return userMock
        } else if (email === 'flaivo@lab.com') {
            return userMock2
        } else {
            undefined
        }
    }
    public async getAllUsers(): Promise<User[]> {
        return [userMock, userMock2]
    }
}