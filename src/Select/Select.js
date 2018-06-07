import React, { Component } from 'react';

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
        this.setWrapperRef = this.setWrapperRef.bind(this);
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

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        const { isDropdownActive } = this.state;

        if (isDropdownActive && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ isDropdownActive: false });
        }
    }

	render() {
		const { isDropdownActive, popupPosition } = this.state;
		const { value, colors } = this.props;

		return (
			<div ref={this.setWrapperRef}>
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
			</div>
		)
	}
}

export default Select;

