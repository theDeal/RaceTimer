import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Appbar() {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (

            <div>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClickOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            RaceTimer
          </Typography>
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Der RaceTimer"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Dieser Timer wurde zum üben geschrieben. Es wird keine Haftung über die zu Verfügunggestellten informationen gegeben.
            Die Daten werden nur Lokal auf dem Gerät wie z.B. im Cache gespeichert.
            <br/>
            Bei Bugs gerne melden :-) <br/><br/>
            Kontakt:<br/>
            c.v.reyher@gmail.com
            <br/>
            <br/>
            Copyright ©2021 Carlo von Reyher
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
      <div className="ausgleichnavbar"></div>
    </div>

    )

    function name(params) {
        
    }
}
