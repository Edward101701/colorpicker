import React, { Component } from 'react';

class Select extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDropdownActive: false,
		};
		this.onSelect = this.onSelect.bind(this);
		this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
	}

	onSelect(colorHex) {
		const { onChange } = this.props;
		onChange(colorHex);
		this.toggleFormVisibility();
	}

	toggleFormVisibility() {
		const { isDropdownActive } = this.state;
		this.setState({ isDropdownActive: !isDropdownActive });
	}

	render() {
		const { isDropdownActive } = this.state;
		const { color, colors } = this.props;

		return (
			<div>
				<a onClick={this.toggleFormVisibility} title="Toggle color select"><img className="toggle toggle_dropdown" alt="" /></a>
				{ isDropdownActive &&
				<ul className="color-list">
					{ colors.map(color => (
						<li className="color-list__item" onClick={() => { this.onSelect(color.value) }} key={color.value}>
							{ color.title }
							<div className="color-example color-example_miniature" style={{ backgroundColor: color.value }}>&nbsp;</div>
						</li>
					))}
				</ul>
				}
			</div>
		)
	}
}

export default Select;

