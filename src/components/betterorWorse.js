import React from 'react'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import { palette } from '@material-ui/system';

export default function BetterorWorse(props) {
    var timefromlapbeforelap = props.timefromlapbefore;
    var lastlaptime = props.lastlaptime;
    var currenttime = new Date();
    var currenttime = currenttime.getTime();
    var altezeit = lastlaptime - timefromlapbeforelap;
    var neuezeit = currenttime - lastlaptime;
    
    return (
        <div>
        {altezeit > neuezeit ? <Faster/> : <Slower/> }
        </div>
    )
}


export function Faster() {
    return (
        <div>
            <h3 color="primary.main">Bisher Schneller</h3>
            <TrendingDownIcon color="primary" fontSize="large"/>
        </div>
    )
}

export function Slower() {
    return (
        <div>
            <h4 color="primary">Bisher Langsamer</h4>
            <TrendingUpIcon color="secondary" fontSize="large"/>
        </div>
    )
}
