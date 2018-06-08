import React, { Component } from 'react';
import ColorPicker from './ColorPicker/ColorPicker';

class App extends Component {
    constructor(props) {
	super(props);
		this.state = {
			color: '#000000',
		};
	    this.colors = [
		    {
			  title: 'red',
			  value: '#ff0000',
		    },
            {
                title: 'yellow',
                value: '#ffff00',
            },
            {
                title: 'green',
                value: '#00ff00',
            },
            {
                title: 'blue',
                value: '#0000ff',
            }
        ];
    }

    onChange(color) {
        console.log(`New Color ${color}`);
    }

    render() {
        const { color } = this.state;
        return (
            <ColorPicker onChange={this.onChange} value={color} colors={this.colors} />
        );
    }
}

export default App;
