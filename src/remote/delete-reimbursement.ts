import { revaboardsClient } from "./revaboards-client";

export async function deleteReimbursement(id: number) {
    try {
        let response = await revaboardsClient.delete(`/reimbursements/${id}`, {});
        return await response;
    } catch (e) {
        return e.response.status
    }
}
