import "./App.css";
import {
  Container,
  BottomNavigationAction,
  BottomNavigation,
  Divider,
} from "@material-ui/core";
import Livecounter from "./components/timer";
import Startscreen from "./components/start";
import Counter from "./components/counter";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import TimerIcon from "@material-ui/icons/Timer";
import { ContactlessOutlined } from "@material-ui/icons";


var hasdata = false;
function App() {
  
    return (
      <div>
        <Container>
          {hasdata ? <Counter/> : <Startscreen onSubmit={(value)=> Starttimer(value)} />}
        </Container>
      </div>
    );

    
}


function Starttimer() {
  hasdata = true;
  App(value);
  alert(values);
  return(
    <Counter />
  );
}



export default App;
