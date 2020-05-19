import { revaboardsClient } from "./revaboards-client";

export async function authenticate(username: string, password: string) {
    let response = await revaboardsClient.post('/auth', {username, password});
    //console.log(response.statusText);
    return await response;
}
