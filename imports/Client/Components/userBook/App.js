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
        busqueda: "hidden",

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
            busquedaH: "",
            botonBusqueda: "hidden",
            owner: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username,  // username of logged in user
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';


    }
    handleChange() {
        const text = ReactDOM.findDOMNode(this.refs.textInputo).value.trim();
        console.log(text);
        this.setState({ busqueda: "" });
        for (i = 0; i < this.props.books.length; i++) {
                Books.update(this.props.books[i]._id, {
                    $set: {
                        busquedaH: "hidden"
                    },
                });
        }
        for (i = 0; i < this.props.books.length; i++) {
            if (this.props.books[i].text == text) {
                Books.update(this.props.books[i]._id, {
                    $set: {
                        busquedaH: "",
                        botonBusqueda: ""
                    },
                });
            }
        }
    }

    render() {
        paila = true;
        for (i = 0; i < this.props.books.length; i++) {
            if (this.props.books[i].busquedaH == "") {
                paila = false;
            }
        }
        if (paila) {
            for (i = 0; i < this.props.books.length; i++) {
                Books.update(this.props.books[i]._id, {
                    $set: {
                        busquedaH: "",
                        botonBusqueda: "hidden"
                    },
                });
            }
        }
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
                <button className={this.state.busqueda} onClick={this.abrrirBoton.bind(this)}> Borrar Libro</button>
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


    abrrirBoton() {
        this.setState({ busqueda: "hidden" });
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