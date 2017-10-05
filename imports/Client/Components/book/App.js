import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from "prop-types";
import Book from './Book';
import {Books} from "../../../api/books";

// App component - represents the whole app
class App extends Component {


    renderTasks() {
        return this.props.books.map((book) => (
            <Book key={book._id} book={book} />
        ));
    }
    handleSubmit(){

    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Books List</h1>
                </header>
                <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                    <input
                        type="text"
                        ref="textInput"
                        placeholder="Type to add new tasks"
                    />
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