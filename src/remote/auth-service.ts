import { p1Client } from "./p1-client";

export async function authenticate(username: string, password: string) {
    let response = await p1Client.post('/auth', {username, password});
    //console.log(response.statusText);
    return await response;
}
