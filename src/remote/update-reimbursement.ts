import { p1Client } from "./p1-client";
import { Reimbursement } from "../models/reimbursements";

//For Users
export async function updateReimbursement(id: number, amount: number, description: string, author: number, reimb_type_id: number) {
    try {
        //The user can only update pending orders.
        let reimb_status_id = 1;
        //Checks the order is indeed pending (2 database calls, not ideal)
        let response = await (await p1Client.get(`/reimbursements/${id}`)).data
        if (response.author != author) {
            return 401;
        }  
        if (response.reimb_status_id == 1) {
            //If its pending, allow the user to update
            let response = await p1Client.patch(`/reimbursements/${id}`, {amount, description, author, reimb_status_id, reimb_type_id});
            return await response;
        }
        return 409
    } catch (e) {
        return e.response.status
    }
}
