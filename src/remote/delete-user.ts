import { p1Client } from "./p1-client";

export async function delUser(id: number) {
    try {
        let response = await p1Client.delete(`/users/${id}`, {});
        return await response;
    } catch (e) {
        return e.response
    }
}
