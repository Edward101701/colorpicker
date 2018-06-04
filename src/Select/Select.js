import React from 'react';

const Select = ({ color, colors, onChange }) => {
	this.onSelect = (event) => {
		onChange(event.target.value);
	};

	return (
		<select value={color} onChange={this.onSelect}>
			{ colors.map(color => <option value={color.value} key={color.value}>{ color.title }</option> ) }
		</select>
	);
};

export default Select;
