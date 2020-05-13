import { revaboardsClient } from "./revaboards-client";

export async function createNewUser(username: string, password: string, firstName: string, lastName: string, email: string) {
    try {
        let response = await revaboardsClient.post('/users', {username, password, firstName, lastName, email});
        return await response.status;
    } catch (e) {
        return e.response.status
    }
}
