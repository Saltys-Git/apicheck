import {jwtVerify, SignJWT} from "jose";

export const createJWT = (prop: any) => {
    // return jwt.sign({ id: user.id }, 'cookies')
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7;

    return new SignJWT({ payload: { prop } })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode("asdasd"));
};


export const validateJWT = async (jwt : string) => {
    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode("asdasd")
    );

    return payload.payload;
};

