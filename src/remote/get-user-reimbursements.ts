import { p1Client } from "./p1-client";

export async function getUserReimbursements(id: number) {
    try {
        let response = await p1Client.get(`/reimbursements/user/${id}`, {});
        return await response;
    } catch (e) {
        return e.response.status
    }
}
