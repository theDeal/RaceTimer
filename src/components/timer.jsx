import React, { Component } from 'react';

class Livecounter extends Component {
    state = { 
        time: 0,
        name: 'Carlo',
        startTime: 0
     };

    render() { 
        return (
            <div>
                <h1>Zeit für {this.state.name}</h1> 

            </div>
        );
    }
}
 
export default Livecounter;