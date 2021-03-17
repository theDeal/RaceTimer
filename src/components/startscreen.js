import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

export default function Startscreen({ onsubmit }) {

    const [Opensnackbar, setopenSnackbar] = useState(false)

    function handlesubmit(e) {
        const name = document.getElementById("name").value;
        const rundenzahl = document.getElementById("rundenzahl").value;
        const startnummer = document.getElementById("startnummer").value;
        const startzeit = new Date();
        if(name == "" || rundenzahl == "" || startnummer == ""){
            handleopensnackbar();
        }else{
            onsubmit({name: name, rundenzahl: rundenzahl, startnummer: startnummer, startzeit: startzeit});
        }
    }

    const handleopensnackbar = () => {
        setopenSnackbar(true);
      };
    
      const handleclosesnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setopenSnackbar(false);
    };


    return (

            <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                className="heightfull">
                    <TextField  id="name" type="text" label="Name des Sportlers" />
                    <TextField 
                    id="rundenzahl"
                    label="Rundenanzahl"
                    type="number"
                    />
                    <TextField 
                    id="startnummer"
                    label="Startnummer"
                    type="number"
                    />
                    <div className="spacer"></div>
                <Button onClick={handlesubmit} variant="contained" color="secondary">Jetzt starten</Button>
                <Snackbar open={Opensnackbar} autoHideDuration={3000} onClose={handleclosesnackbar} message="Alle Felder Ausfüllen !"/>
            </Grid>
    );

    
}


