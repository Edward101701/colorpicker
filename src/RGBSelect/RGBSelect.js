import React, { Component } from 'react';

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
				<a
					className="toggle"
					onClick={this.toggleFormVisibility}
					title="Open RGB form"
				>
					<span style={{ backgroundColor: rgbToHex(color.r, color.g, color.b) }} className="color-example">&nbsp;</span>
				</a>
				{ isFormActive &&
				<form className="rgb-form">
					<div className="rgb-form__item">
						<label>R</label>
						<input className="rgb-form__range" name="r" type="range" max="255" onChange={this.onColorChange} value={color.r} />
					</div>
					<div className="rgb-form__item">
						<label>G</label>
						<input className="rgb-form__range" name="g" type="range" max="255" onChange={this.onColorChange} value={color.g} />
					</div>
					<div className="rgb-form__item">
						<label>B</label>
						<input className="rgb-form__range" name="b" type="range" max="255" onChange={this.onColorChange} value={color.b} />
					</div>
					<div className="rgb-form__footer">
						<button className="rgb-form__button" type="button" onClick={this.onCancel}>Cancel</button>
						<button className="rgb-form__button rgb-form__button_success" type="button" onClick={this.onSave}>Ok</button>
					</div>
				</form>
				}
			</div>
		)
	}
}

export default RGBSelect;
