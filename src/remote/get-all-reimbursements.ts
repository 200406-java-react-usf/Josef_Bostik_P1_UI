import { revaboardsClient } from "./revaboards-client";

export async function getReimbursements(id: number) {
    try {
        let response = await revaboardsClient.get(`/reimbursements`, {});
        return await response;
    } catch (e) {
        return e.response
    }
}
