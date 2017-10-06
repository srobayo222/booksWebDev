import React, { Component } from 'react';
import PropTypes from "prop-types";

// Task component - represents a single todo item
export default class Book extends Component {
    render() {
        return (
            <div>
                <li>Nombre libro:{this.props.book.text}</li>
                <li>Fecha creacion :{this.props.book.date}</li>
            </div>

        );
    }
}

Book.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    book: PropTypes.object.isRequired,
};