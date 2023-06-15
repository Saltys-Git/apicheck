"use client"

import {asdCall} from "../../lib/api";


async function getAsd(){
    const asd = await asdCall()
    console.log(asd)
}

export default function Comp(){
    return(
        <div>
            <button onClick={()=>getAsd()}>click</button>
        </div>
    )
}