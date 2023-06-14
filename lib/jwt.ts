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
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};


export const validateJWT = async (jwt : string) => {
    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return payload.payload;
};

