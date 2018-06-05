import React, { Component } from 'react';

import RGBSelect from '../RGBSelect/RGBSelect';
import Select from '../Select/Select';

class ColorPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: '#ffff00',
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
			},
        ];

        this.onColorSelect = this.onColorSelect.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
    }

	onColorSelect(newColor) {
        this.setState({ color: newColor });
    }

    onColorChange(event) {
        this.setState({ color: event.target.value.trim() });
    }

	render() {
        const { color } = this.state;

		return (
		    <div className="color-picker">
                <input className="input" name="color" value={color} onChange={this.onColorChange} />
                <RGBSelect value={color} onChange={this.onColorSelect} />
                <Select color={color} colors={this.colors} onChange={this.onColorSelect} />
            </div>
        )
	}
}

export default ColorPicker;
