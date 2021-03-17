import React from 'react'

export default function laplist(props) {
    var laparray = props.laparray;
    var timedifference = props.zeitenarray;

    return (
        <div>
            <ul>
                {
                    laparray.map(function (element, index){
                        return <Rendercomponent data={element} index={index} zeitunterschied={timedifference[index+1].timedifference} />
                    })
                }
            </ul>
            
        </div>
    )

}





export function Rendercomponent(props) {
    var currentindex = props.index;
    var currenttimestamp = props.data;
    var zeitunterschied = props.zeitunterschied;
    var writtentime = currenttimestamp.toLocaleTimeString();
        return (
            <div>
                <li>
                    <h4>Runde {currentindex + 1}</h4>
                    <h5>Uhrzeit an der Messtelle: {writtentime}</h5>
                    <h5>Zeit von für diese Runde: {zeitunterschied}</h5>
                </li>
            </div>
        )
}

