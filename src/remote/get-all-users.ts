import { p1Client } from "./p1-client";

export async function getUsers() {
    try {
        let response = await p1Client.get(`/users`, {});
        return await response;
    } catch (e) {
        return e.response
    }
}
