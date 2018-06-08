import React, { Component } from 'react';

import Popup from '../Popup';

class Select extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDropdownActive: false,
            popupPosition: {
                top: 0,
                left: 0,
            }
		};
        this.listOffset = {
            top: 60,
            left: -100,
        };
		this.onSelect = this.onSelect.bind(this);
		this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	onSelect(colorHex) {
		const { onChange } = this.props;
		onChange(colorHex);
		this.toggleFormVisibility();
	}

	toggleFormVisibility(event) {
		const { isDropdownActive } = this.state;
		if (!isDropdownActive) {
			this.setState({
				popupPosition: {
					top: event.target.offsetTop + this.listOffset.top,
					left: event.target.offsetLeft + this.listOffset.left,
				}
			});
		}
		this.setState({ isDropdownActive: !isDropdownActive });
	}

    handleClickOutside(event) {
        const { isDropdownActive } = this.state;

        if (isDropdownActive) {
            this.setState({ isDropdownActive: false });
        }
    }

	render() {
		const { isDropdownActive, popupPosition } = this.state;
		const { value, colors } = this.props;

		return (
			<Popup onClickOutside={this.handleClickOutside}>
				<a onClick={this.toggleFormVisibility} title="Toggle color select"><img className="toggle toggle_dropdown" alt="" /></a>
				{ isDropdownActive &&
				<ul className="color-list" style={{ top: popupPosition.top, left: popupPosition.left }}>
					{ colors.map(color => (
						<li className={`color-list__item ${color.value === value ? 'color-list__item_active' : ''}`} onClick={() => { this.onSelect(color.value) }} key={color.value}>
							{ color.title }
							<div className="color-example color-example_miniature" style={{ backgroundColor: color.value }}>&nbsp;</div>
						</li>
					))}
				</ul>
				}
			</Popup>
		)
	}
}

export default Select;

