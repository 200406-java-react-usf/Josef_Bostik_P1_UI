import { revaboardsClient } from "./revaboards-client";

export async function getUsers() {
    try {
        let response = await revaboardsClient.get(`/users`, {});
        return await response;
    } catch (e) {
        return e.response
    }
}
