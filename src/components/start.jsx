import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { Grid, Button } from '@material-ui/core';

class Startscreen extends Component {

    state = {
    }
    
    handleChange = (event) =>{
        this.setState({[event.target.id]: event.target.value});
    }

    

    render() {
        return ( 
            <div>
                <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                >
                    <h2>Zum Starten ausfüllen:</h2>
                    <TextField value={this.state.name} onChange={ this.handleChange } id="name" type="text" label="Name des Sportlers" /><br/>
                    <TextField value={this.state.rundenzahl} onChange={ this.handleChange }
                    id="rundenzahl"
                    label="Rundenanzahl"
                    type="number"
                    />
                    <TextField value={this.state.startnummer} onChange={ this.handleChange }
                    id="startnummer"
                    label="Startnummer"
                    type="number"
                    />
                    <div className="spacer"></div>
                    <Button onClick={event => this.props.onSubmit(this.state)} variant="contained" id="hi" color="secondary">Jetzt Starten</Button>
                </Grid>
                
            </div>
         );
    }
    
}
 
export default Startscreen;