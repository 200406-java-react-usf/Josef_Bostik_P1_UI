import { revaboardsClient } from "./revaboards-client";

export async function delUser(id: number) {
    try {
        let response = await revaboardsClient.delete(`/users/${id}`, {});
        return await response;
    } catch (e) {
        return e.response
    }
}
