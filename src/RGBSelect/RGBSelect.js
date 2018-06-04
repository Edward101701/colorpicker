import React, { Component } from 'react';

import './RGBSelect.css';
import { rgbToHex, hexToRgb } from '../helpers';

class RGBSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFormActive: false,
			color: {
				r: 0,
				g: 0,
				b: 0,
			}
		};

		this.onColorChange = this.onColorChange.bind(this);
		this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { value } = nextProps;
		const color = hexToRgb(value);
		if (!color) {
			return;
		}
		this.setState({ color });
	}

	onColorChange(event) {
		const { onChange } = this.props;
		let newColor = { ...this.state.color };
		newColor[event.target.name] = +event.target.value;
		this.setState({ color: newColor });
		onChange(rgbToHex(newColor.r, newColor.g, newColor.b));
	}

	toggleFormVisibility() {
		const { isFormActive } = this.state;

		if (!isFormActive) {
			const { color } = this.state;
			this.setState({ backupColor: color });
		} else {
			const { backupColor } = this.state;
			const { onChange } = this.props;
			this.setState({ color: backupColor });
			onChange(rgbToHex(backupColor.r, backupColor.g, backupColor.b));
		}

		this.setState({ isFormActive: !isFormActive });
	}

	onCancel() {
		const { backupColor } = this.state;
		const { onChange } = this.props;
		this.setState({ color: backupColor, isFormActive: false });
		onChange(rgbToHex(backupColor.r, backupColor.g, backupColor.b));
	}

	onSave() {
		this.setState({ backupColor: null, isFormActive: false });
	}

	render() {
		const { isFormActive, color } = this.state;

		return (
			<div className="rgb-container">
				<button
					className="rgb-container__toggle"
					type="button"
					onClick={this.toggleFormVisibility}
					name="Open RGB form"
					style={{ backgroundColor: rgbToHex(color.r, color.g, color.b) }}
				/>
				{ isFormActive &&
				<form className="rgb-form">
					<input name="r" type="range" max="255" onChange={this.onColorChange} value={color.r} />
					<input name="g" type="range" max="255" onChange={this.onColorChange} value={color.g} />
					<input name="b" type="range" max="255" onChange={this.onColorChange} value={color.b} />
					<button type="button" onClick={this.onCancel}>Cancel</button>
					<button type="button" onClick={this.onSave}>Ok</button>
				</form>
				}
			</div>
		)
	}
}

export default RGBSelect;
