import React, { Component } from 'react';

import { rgbToHex, hexToRgb } from '../helpers';

class RGBSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			r: 0,
			g: 0,
			b: 0,
		};

		this.onColorChange = this.onColorChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		const { value } = nextProps;
		const a = hexToRgb(value);
		this.setState({ ...a });
	}

	onColorChange(event) {
		const { onChange } = this.props;
		this.setState({ [event.target.name]: +event.target.value });
		onChange(rgbToHex(this.state.r, this.state.g, this.state.b));
	}

	render() {
		const { r, g, b } = this.state;

		return (
			<form onChange={this.onColorChange}>
				<input name="r" type="range" max="255" value={r} />
				<input name="g" type="range" max="255" value={g} />
				<input name="b" type="range" max="255" value={b} />
			</form>
		)
	}
}

export default RGBSelect;
