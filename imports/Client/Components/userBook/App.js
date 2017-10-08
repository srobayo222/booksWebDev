import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import Book from './Book';
import { Meteor } from 'meteor/meteor';
import { Books } from "../../../api/books";
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
        busqueda: false,
        aBuscar: "",
        libros: []

    };
  }

  renderTasks() {
          return this.props.books.map((book) => (
              <Book key={book._id} book={book}  />
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
            comments: "",
            mG:"hidden",
            mL: "hidden",
            mI: "hidden",
            owner: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username,  // username of logged in user
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';


    }
    handleChange() {
        const text = ReactDOM.findDOMNode(this.refs.textInputo).value.trim();
        console.log(text);
        this.setState({
            aBuscar: text,
            busqueda: true
        });
        console.log("hola"+ this.state.aBuscar);
     }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Books List</h1>
                </header>
                <AccountsUIWrapper />
                <h3>Buscar Libro</h3>
                <form className="new-task" onSubmit={this.handleChange.bind(this)} ><p><input
                        type="text"
                        ref="textInputo"
                        placeholder="Buscar libro" /></p>
                </form>
                {this.props.currentUser ?
                  <div>
                <h3>Agregar Nuevo Libro</h3>
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <p><input
                            type="text"
                            ref="textInput"
                            placeholder="Escriba nombre del nuevo libro" /></p>
                    </form> </div>: ''
                    }
                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }


}
App.propTypes = {
    books: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    return {
        books: Books.find({}).fetch(),
        currentUser: Meteor.user(),
    };
}, App);