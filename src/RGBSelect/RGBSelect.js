import React, { Component } from 'react';

import { rgbToHex, hexToRgb } from '../helpers';

class RGBSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFormActive: false,
			popupPosition: {
				top: 0,
				left: 0,
			},
		};
		this.formOffset = {
			top: 60,
			left: -100,
		};

		this.onColorChange = this.onColorChange.bind(this);
		this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.closeForm = this.closeForm.bind(this);
	}

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

	onColorChange(event) {
		const { onChange, value } = this.props;
		let newColor = hexToRgb(value);
		newColor[event.target.name] = +event.target.value;
		onChange(rgbToHex(newColor.r, newColor.g, newColor.b));
	}

	toggleFormVisibility(event) {
		const { isFormActive } = this.state;

		if (!isFormActive) {
			const { value } = this.props;
			this.setState({
				backupColor: value,
				popupPosition: {
					top: event.target.offsetTop + this.formOffset.top,
					left: event.target.offsetLeft + this.formOffset.left,
				}
			});
            this.setState({ isFormActive: true });
		} else {
			this.closeForm();
		}
	}

	closeForm() {
        const { backupColor } = this.state;
        const { onChange } = this.props;
        onChange(backupColor);
        this.setState({ isFormActive: false });
	}

	onCancel() {
		const { backupColor } = this.state;
		const { onChange } = this.props;
		this.setState({ isFormActive: false });
		onChange(backupColor);
	}

	onSave() {
		this.setState({ backupColor: null, isFormActive: false });
	}

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
		const { isFormActive } = this.state;

        if (isFormActive && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.closeForm();
        }
    }

	render() {
		const { isFormActive, popupPosition } = this.state;
		const { value } = this.props;
		const rgbColor = hexToRgb(value);

		return (
			<div className="rgb-container" ref={this.setWrapperRef}>
				<a
					className="toggle toggle_color-demo"
					onClick={this.toggleFormVisibility}
					title="Open RGB form"
				>
					<span style={{ backgroundColor: value }} className="color-example color-example_toggle">&nbsp;</span>
				</a>
				{ isFormActive &&
				<form className="rgb-form" style={{ top: popupPosition.top, left: popupPosition.left }}>
					<div className="rgb-form__item">
						<label>R</label>
						<input className="rgb-form__range" name="r" type="range" max="255" onChange={this.onColorChange} value={rgbColor && rgbColor.r} />
					</div>
					<div className="rgb-form__item">
						<label>G</label>
						<input className="rgb-form__range" name="g" type="range" max="255" onChange={this.onColorChange} value={rgbColor && rgbColor.g} />
					</div>
					<div className="rgb-form__item">
						<label>B</label>
						<input className="rgb-form__range" name="b" type="range" max="255" onChange={this.onColorChange} value={rgbColor && rgbColor.b} />
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
