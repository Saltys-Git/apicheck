import {SignJWT} from "jose";

interface APIInterface {
    url: string,
    method: string,
    body?: any
}
const fetcher = async ({ url, method, body }: APIInterface) => {
    const init = {
        method,
        body: body && JSON.stringify(body),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    }
    if(method === "GET"){
        delete init.body
    }
    const res = await fetch(url, init);
    const data = await res.json();
    return data
};


export const asdCall = async () => {
    const iat = Date.now() / 1000
    const exp = iat + 60
    const jwt = await createJWT(exp)
    console.log(jwt)
    return fetcher({
        url: `/api/dbdatas`,
        method: 'POST',
        body: jwt
    });
};
const createJWT = (prop: any) => {
    // return jwt.sign({ id: user.id }, 'cookies')
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7;

    return new SignJWT({ payload: { prop } })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_public_encode_key));
};