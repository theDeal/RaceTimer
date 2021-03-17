import "./App.css";
import {
  Container,
  BottomNavigationAction,
  BottomNavigation,
  Divider,
  Button,
  Grid,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import TimerIcon from "@material-ui/icons/Timer";
import { ContactlessOutlined } from "@material-ui/icons";
import { useState } from "react";
import Startscreen from "./components/startscreen";
import CounterApp from "./components/counterApp";
import Appbar from "./components/appBar";


function App() {
    
  const [userinformation, setuserinformation] = useState()

    return (
      <div>
        <Appbar/>
        <Container>
          {userinformation ? <CounterApp userinformation={userinformation} hadlestop={setuserinformation}/> : <Startscreen onsubmit={setuserinformation}/>}
        </Container>
      </div>
    );

    
}

export default App;
