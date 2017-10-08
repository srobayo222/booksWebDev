import React, { Component } from 'react';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import { Books } from '../../../api/books';
import { createContainer } from 'meteor/react-meteor-data';

// Task component - represents a single todo item
class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            noDioLike: true,
            noDioDislike: true
        };
    }

    render() {
        const bookClassName = this.props.book.genre ? 'checked' : '';
        return (
            <div className={this.props.book.busquedaH} >
                <br />
                <div className="row contenedora">
                    <div className="col-sm-4 ">
                        Titulo: <h3>{this.props.book.text}</h3>
                        <br />
                        <img src={this.props.book.imagen} onClick={this.mostrarImagen.bind(this)} alt="" height="100" width="100" /><br />
                        {this.props.currentUser ?
                            <form className={this.props.book.mI} onSubmit={this.cambiarImagen.bind(this)}>
                                <input type="text" ref="textInputIm" placeholder="Direccion url de la imagen" />
                            </form> : ''}
                        <br />
                        <p className="descLibro" onClick={this.mostrarGenero.bind(this)}>Genero: {this.props.book.genero}</p>
                        {this.props.currentUser ?
                            <form className={this.props.book.mG} onSubmit={this.editarGenre.bind(this)}>
                                <input type="text" ref="textInputi" placeholder={this.props.book.genero} />
                            </form> : ''}
                        <p className="descLibro" onClick={this.mostrarIdioma.bind(this)}> idioma: {this.props.book.idioma}</p>
                        {this.props.currentUser ?
                            <form className={this.props.book.mL} onSubmit={this.editarLan.bind(this)}>
                                <input type="text" ref="textInputo" placeholder={this.props.book.idioma} />
                            </form> : ''}
                        <p > <img onClick={this.darLike.bind(this)} src="https://noticiasmicrojuris.files.wordpress.com/2013/10/facebook-like.png" alt="" height="60" width="60" /> : {this.props.book.likes} </p>
                        <p ><img onClick={this.darDislike.bind(this)} src="https://timedotcom.files.wordpress.com/2014/12/dislike.jpeg?h=580" alt="" height="50" width="55" />: {this.props.book.dislikes} </p>
                    </div>
                    <div className="col-sm-8 ">
                        <h2 className="tituloLibro">Historia:</h2><br />
                        {this.props.currentUser ?
                            <form onSubmit={this.editarStory.bind(this)}>
                                <input type="text" ref="textInput" placeholder="Agregar historia" />
                            </form> : ''}
                        <p className="historia">{this.props.book.texto}</p>
                        {this.props.currentUser ?
                            <button className="delete btn" onClick={this.deleteThisTask.bind(this)}> Borrar Libro</button> : ''}
                        <p><span className="text">
                            Escrito por:<strong>{this.props.book.username}</strong>
                        </span></p><br />
                        <p>Comentarios:</p>
                        {this.props.currentUser ?
                            <form onSubmit={this.addComment.bind(this)}>
                                <input type="text" ref="textInputco" placeholder="Agregar Comentario" />
                            </form> : ''}
                        <p className="comentario"><textarea readOnly>{this.props.book.comments}</textarea></p></div>
                    <button className={this.props.book.botonBusqueda} onClick={this.salirBusqueda.bind(this)}>Salir de Busqueda</button>
                </div>
                <br />
                <br />
            </div>
        );
    }
    editarGenre() {
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInputi).value.trim();
        Books.update(this.props.book._id, {
            $set: {
                genero: text,
                mG: "hidden"
            },
        });
    }
    mostrarGenero() {
        Books.update(this.props.book._id, {
            $set: { mG: "" },
        });
    }
    salirBusqueda() {
        Books.update(this.props.book._id, {
            $set: { busquedaH: "hidden" },
        });
    }
    darLike() {
        if (this.props.currentUser) {
            const likes = this.props.book.likes;
            const nLikes = likes + 1;
            Books.update(this.props.book._id, {
                $set: { likes: nLikes },
            });
            this.setState({ noDioLike: false });
        }
    }
    darDislike() {
        if (this.props.currentUser && this.state.noDioLike) {
            const dLikes = this.props.book.dislikes;
            const nDlikes = dLikes + 1;
            Books.update(this.props.book._id, {
                $set: { dislikes: nDlikes },
            });
        }
    }

    editarLan() {
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInputo).value.trim();
        Books.update(this.props.book._id, {
            $set: {
                idioma: text,
                mL: "hidden"
            },
        });
    }
    mostrarIdioma() {
        Books.update(this.props.book._id, {
            $set: { mL: "" },
        });
    }

    editarStory() {
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        nText = (this.props.book.texto + " "+ text);
        Books.update(this.props.book._id, {
            $set: { texto: nText },
        });
    }
    addComment() {
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInputco).value.trim();
        nText = (this.props.book.comments + "\n" + text + "               usuario:" + Meteor.user().username +".");
        Books.update(this.props.book._id, {
            $set: { comments: nText },
        });
    }
    cambiarImagen() {
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInputIm).value.trim();
        Books.update(this.props.book._id, {
            $set: {
                imagen: text,
                mI: "hidden"
            },
        });
    }
    mostrarImagen() {
        Books.update(this.props.book._id, {
            $set: { mI: "" },
        });
    }

    deleteThisTask() {
            Books.remove(this.props.book._id);
    }
}
Book.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    book: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
};
export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, Book);