import { revaboardsClient } from "./revaboards-client";
import { Reimbursement } from "../models/reimbursements";

export async function updateUser(id: number, username: string, password: string, firstName: string, lastName: string, email: string) {
    try {
        //not the most elegant solution, but it works for the time being
        let response = await revaboardsClient.patch(`/users/${id}`, {id, username, password, firstName, lastName, email});
        return await response;
    } catch (e) {
        return e.response
    }
}
