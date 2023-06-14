import {NextRequest, NextResponse} from "next/server";
import {validateJWT} from "../../../../lib/jwt";

function isSameKey(localKey: number, decodedKey: number){
    const difference = decodedKey - localKey

    if(difference > 0 && difference < 62){
        return true
    }else{
        return false
    }
}


export async function POST(request: NextRequest) {
    const body = await request.json()
    const key = body
    const iat = Date.now() / 1000
    const decodedKey:any = await validateJWT(key)
    const compareKeys = isSameKey(iat, decodedKey.prop)
    const difference = decodedKey.prop-iat
    return NextResponse.json({iat:iat, decodedKey:decodedKey, compareKeys:compareKeys, difference:difference})
}