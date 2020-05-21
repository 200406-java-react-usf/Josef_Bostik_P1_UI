import { p1Client } from "./p1-client";
import { Reimbursement } from "../models/reimbursements";

export async function updateUser(id: number, username: string, password: string, firstName: string, lastName: string, email: string, role: string) {
    try {
        //not the most elegant solution, but it works for the time being
        let response = await p1Client.patch(`/users/${id}`, {id, username, password, firstName, lastName, email, role});
        return await response;
    } catch (e) {
        return e.response
    }
}
