import { p1Client } from "./p1-client";

export async function createNewUser(username: string, password: string, firstName: string, lastName: string, email: string) {
    try {
        let response = await p1Client.post('/users', {username, password, firstName, lastName, email});
        return await response;
    } catch (e) {
        return e.response
    }
}
