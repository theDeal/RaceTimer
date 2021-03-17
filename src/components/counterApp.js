import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Laplist from './laplist';
import BetterorWorse from './betterorWorse'
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import StopIcon from '@material-ui/icons/Stop';
import { jsPDF } from "jspdf";
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function CounterApp(userinformation) {
    const [modalopen, setmodalopen] = useState(false)
    const startzeit = userinformation.userinformation.startzeit.toLocaleString();
    const startzeitobject = userinformation.userinformation.startzeit;
    const [aktuellerunde, setAktuellerunde] = useState(0);
    const [rennenamlaufen, setRennenamlaufen] = useState(true);
    const [aktuelleZeit, setaktuelleZeit] = useState(0);
    const [zufahren, setzufahren] = useState(userinformation.userinformation.rundenzahl - aktuellerunde);
    const [timedifference, setTimedifference] = useState({
        0:{
            datum: startzeitobject.getTime(), 
            timedifference: 0
        }
    });
    const [rundentimestamps, setRundentimestamps] = useState([]);
    const startStamp = userinformation.userinformation.startzeit.getTime();

    function callculatetime() {
        var newDate = new Date();
        var newStamp = newDate.getTime();

        var diff = Math.round((newStamp-startStamp)/1000);


        var d = Math.floor(diff/(24*60*60)); /* though I hope she won't be working for consecutive days :) */
        diff = diff-(d*24*60*60);
        var h = Math.floor(diff/(60*60));
        diff = diff-(h*60*60);
        var m = Math.floor(diff/(60));
        diff = diff-(m*60);
        var s = diff;
        return(d+" day(s), "+h+" hour(s), "+m+" minute(s), "+s+" second(s)");
    }


    React.useEffect(() => {
        let  intervall = null;

        if(rennenamlaufen){
            intervall = setInterval(() => {
                setaktuelleZeit(callculatetime)
            }, 10);
        }else{
            clearInterval(intervall)
        }

        return () => clearInterval(intervall)
    }, [rennenamlaufen])

    
    function rundehinzufügen() {
        var newDate = new Date();
        setAktuellerunde(aktuellerunde + 1);
        setzufahren(userinformation.userinformation.rundenzahl - aktuellerunde -1);
        setRundentimestamps(rundentimestamps => [...rundentimestamps, newDate]);
        setTimedifference({...timedifference,  [aktuellerunde+1]:{
            datum: newDate.getTime(), 
            timedifference: calculatetimedifference([timedifference[aktuellerunde].datum], newDate),
            timefromlapbefore: [timedifference[aktuellerunde].datum]
        }
        })
    }


    function calculatetimedifference(oldtime, newtime) {
        var oldstamp = oldtime;
        var newStamp = newtime.getTime();
        var diff = Math.round((newStamp-oldstamp)/1000);
        var d = Math.floor(diff/(24*60*60)); /* though I hope she won't be working for consecutive days :) */
        diff = diff-(d*24*60*60);
        var h = Math.floor(diff/(60*60));
        diff = diff-(h*60*60);
        var m = Math.floor(diff/(60));
        diff = diff-(m*60);
        var s = diff;
        return(d+" d, "+h+" h, "+m+" m, "+s+" s");
    }

    
    
    

    return (
        <>
        <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                >

            <p>Startnummer: {userinformation.userinformation.startnummer}</p>
            <h1>{userinformation.userinformation.name}</h1>
            <h4>Startzeit: {startzeit}</h4>
            

            <Card className="widthfull card">
                <CardContent>
                <div className="spacer-sm"></div>
                    <Typography color="textSecondary" gutterBottom>
                    Live Zeit:
                    </Typography>
                    <div className="spacer-sm"></div>
                    <Typography variant="h5" component="h2">
                    {aktuelleZeit}
                    </Typography>
                    <div className="spacer-sm"></div>
                    <Typography variant="body2" component="p">
                    Startzeit: {startzeit}
                    </Typography>
                </CardContent>
            </Card>

            <div className="spacer"></div>

            <Card className="widthfull card">
                <CardContent>
                <div className="spacer-sm"></div>
                    <div className="nexttoeachothercardjustifyleft">
                        <div>
                            <Typography color="textSecondary" gutterBottom>
                            zu Fahren:
                            </Typography>
                            <div className="spacer-sm"></div>
                            <Typography variant="h3" component="h2">
                            {zufahren}
                            </Typography>
                        </div>
                        <div className="iconforrundenzahl">
                            {aktuellerunde == 0 ? <h1></h1> : <BetterorWorse timefromlapbefore={timedifference[aktuellerunde-1].timefromlapbefore} lastlaptime={timedifference[aktuellerunde-1].datum}/>}
                        </div>
                    </div>
                    <div className="spacer"></div>
                    <div className="nexttoeachothercard">
                        <div>
                            <Typography color="textSecondary" gutterBottom>
                            Rundenanzahl:
                            </Typography>
                            <div className="spacer-sm"></div>
                            <Typography variant="h4" component="h1">
                            {aktuellerunde}
                            </Typography>
                        </div>
                        <div>
                            <Typography color="textSecondary" gutterBottom>
                            Gesamtrundenzahl:
                            </Typography>
                            <Typography variant="h4" component="h1">
                                {userinformation.userinformation.rundenzahl}
                            </Typography>
                        </div>
                    </div>

                </CardContent>
                <Fab onClick={rundehinzufügen} className="floatbutton" variant="extended" color="secondary" >
                    <AddIcon />
                    Runde Hinzufügen
                </Fab>
            </Card>

            <div className="spacer"></div>

            <Card className="widthfull card">
                <CardContent>
                <Typography color="textSecondary" variant="h5" gutterBottom>
                            Rundenanzahl:
                </Typography>
                <Laplist laparray={rundentimestamps} zeitenarray={timedifference}/>
                </CardContent>
            </Card>


            <Fab onClick={handlestop} className="floatbuttonleft" variant="extended" color="primary" >
                <StopIcon />
                Beenden
            </Fab>
            
            
            
        
        </Grid>

        <Dialog
        open={modalopen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"RaceTimer"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>Danke</b> das Sie den <b>RaceTimers</b> benutzen. Sie können nun ihre Daten als <b>PDF Herurunterladen!</b>
            <br/>
            <br/>
            Drücken Sie dazu auf <b>PDF Speichern</b>
            <br/>
            <b>Nach</b> dem Speichern können Sie die <b>Daten im Browser löschen.</b>
            <br/>
            <br/>
            Es wird <b>keine Garantie</b> auf die Richtigkeit der Daten gegeben.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlesavedata} color="primary" variant="contained"
        startIcon={<SaveIcon />}>
            Daten als PDF Herunterladen
          </Button>
          <Button onClick={handledelite} color="secondary" variant="contained"
        startIcon={<DeleteForeverIcon />} >
            Daten Löschen
          </Button>
        </DialogActions>
      </Dialog>

        
        
        </>
    )
    
    

    
    function handledelite() {
        setmodalopen(false);
        userinformation.hadlestop(null);//Clean all the Data
    }
    function handlestop() {
        // Start file download.
        setmodalopen(true);
        
    }

    function handlesavedata() {
        exportPDF();
    }
        




    function exportPDF(){
        const doc = new jsPDF();
          
        var startnummer = userinformation.userinformation.startnummer;
        var name = "Name: " + userinformation.userinformation.name;
        var startzeit = userinformation.userinformation.startzeit.toLocaleString();
        var text = "Startzeit: " + startzeit + "         Startnummer: " + startnummer;
        doc.text(name, 10, 10);
        doc.text(text, 10, 20);
        var setoff = 30;
        console.log(timedifference);
        
        const keys = Object.keys(timedifference)
        console.log(keys);
        var pageheight = 280;
        keys.forEach(element =>{
            if (element == 0) {
                
            }else{
            if (setoff > pageheight){
                setoff = 10;
                doc.addPage();
            }
            var runde = "Runde " + element;
            doc.text(runde, 10, setoff)
            doc.text(JSON.stringify(timedifference[element].timedifference), 20, setoff+10);
            setoff = setoff + 19;   
        }
        
        })
        doc.addPage();
        var gesamtzeit = "Gesamtzeit:  " + aktuelleZeit;
        doc.text(gesamtzeit, 10, 10)
        doc.text("Runden zu fahren: " + userinformation.userinformation.rundenzahl, 10, 30)
        doc.text("Runden gefahren: " +aktuellerunde.toString(), 10, 60)
        
        doc.save("AlleDaten.pdf");
     }
      
      
}
