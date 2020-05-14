import { revaboardsClient } from "./revaboards-client";

export async function createNewReimbursement(amount: number, description: string, author: number, type: number) {
    try {
        let reimb_status_id = 1;
        let submitted = "";
        let resolved = "";
        let receipt = "";
        let resolver = "";
        let response = await revaboardsClient.post('/reimbursements', {amount, submitted, resolved, description, receipt, author, reimb_status_id, resolver, reimb_type_id: type});
        return await response.status;
    } catch (e) {
        return e.response.status
    }
}
