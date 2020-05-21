import { p1Client } from "./p1-client";

export async function getReimbursements(id: number) {
    try {
        let response = await p1Client.get(`/reimbursements`, {});
        return await response;
    } catch (e) {
        return e.response
    }
}
