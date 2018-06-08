import React, { Component } from 'react';

class Select extends Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
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
        const { onClickOutside } = this.props;

        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            onClickOutside();
        }
    }

    render() {
        const { children } = this.props;

        return (
            <div ref={this.setWrapperRef}>
                { children }
            </div>
        )
    }
}

export default Select;

