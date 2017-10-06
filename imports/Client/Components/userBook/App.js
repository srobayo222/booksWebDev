import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import Book from './Book';
import { Books } from "../../../api/books";

// App component - represents the whole app
class App extends Component {


    renderTasks() {
        return this.props.books.map((book) => (
            <Book key={book._id} book={book} />
        ));
    }
    handleSubmit() {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Books.insert({
            imagen: "https://d30y9cdsu7xlg0.cloudfront.net/png/3688-200.png",
            text,
            genero :"",
            idioma :"",
            texto :"",
            likes: 0,
            dislikes: 0,
            mG:"hidden",
            mL: "hidden",
            mI: "hidden"
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';


    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Books List</h1>
                </header>
                <h3>Browse book</h3>
                <p><input
                    type="text" placeholder="buscar libro" /></p>
                <h3>Add new book</h3>
                <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                    <p><input
                        type="text"
                        ref="textInput"
                        placeholder="Escriba nombre del nuevo libro" /></p>
                </form>
                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }


}
App.propTypes = {
    books: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        books: Books.find({}).fetch(),
    };
}, App);