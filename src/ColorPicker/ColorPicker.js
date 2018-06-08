import React, { Component } from 'react';

import RGBSelect from '../RGBSelect/RGBSelect';
import Select from '../Select/Select';

class ColorPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: props.value || '#000000',
            fakeColor: null,
        };

        this.onColorSelect = this.onColorSelect.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
    }

	onColorSelect(newColor, isFakeColor) {
        const { onChange } = this.props;
        if (isFakeColor) {
            this.setState({ fakeColor: newColor });
        } else {
            this.setState({ color: newColor, fakeColor: null });
            onChange(newColor);
        }
    }

    onColorChange(event) {
        this.onColorSelect(event.target.value.trim());
    }

	render() {
        const { color, fakeColor } = this.state;
        const { colors } = this.props;

		return (
		    <div className="color-picker">
                <input className="input" name="color" value={fakeColor || color} onChange={this.onColorChange} />
                <RGBSelect value={fakeColor || color} onChange={this.onColorSelect} />
                <Select value={color} colors={colors} onChange={this.onColorSelect} />
            </div>
        )
	}
}

export default ColorPicker;
