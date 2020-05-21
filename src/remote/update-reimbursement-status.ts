import { p1Client } from "./p1-client";
import { Reimbursement } from "../models/reimbursements";

export async function updateReimbursementStatus(reimb: Reimbursement, status: number, authId: number) {
    try {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        //not the most elegant solution, but it works for the time being
        let response = await p1Client.patch(`/reimbursements/${reimb.id}`, {amount: reimb.amount, submitted: reimb.submitted, resolved: dateTime, description: reimb.description, receipt: reimb.receipt, author: reimb.author, resolver: authId, reimb_status_id: status, reimb_type_id: reimb.reimb_type_id});
        return await response;
    } catch (e) {
        return e.response.status
    }
}
