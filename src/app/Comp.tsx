import {asdCall} from "../../lib/api";


async function getAsd(){
    const asd = await asdCall()
    console.log(asd.iat)
}

export default function Comp(){
    return(
        <div>
            <button onClick={()=>getAsd()} className="text-white">click</button>
        </div>
    )
}