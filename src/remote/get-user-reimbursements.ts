import { revaboardsClient } from "./revaboards-client";

export async function getUserReimbursements(id: number) {
    try {
        let response = await revaboardsClient.get(`/reimbursements/user/${id}`, {});
        return await response;
    } catch (e) {
        return e.response.status
    }
}
