import { p1Client } from "./p1-client";

export async function deleteReimbursement(id: number) {
    try {
        let response = await p1Client.delete(`/reimbursements/${id}`, {});
        return await response;
    } catch (e) {
        return e.response.status
    }
}
