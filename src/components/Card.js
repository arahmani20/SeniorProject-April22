import "../styles/Card.css";

import React, { Component } from "react";
import ReactDom from 'react-dom';
import Popup from 'react-popup';
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import CardEditor from "./CardEditor";

class Card extends Component {
  state = {
    hover: false,
    editing: false,
    btn: ''  //color button
  };

  startHover = () => this.setState({ hover: true });
  endHover = () => this.setState({ hover: false });

  startEditing = () => {
    if (this.props.card.desc === undefined)
      this.props.card.desc = "Description";
    
    console.log(this.props.card.desc);
    /** Call the plugin */
    Popup.plugins().prompt('', this.props.card.desc, function (value) {
      Popup.alert('You typed: ' + value);
    });
    this.setState({
      hover: false,
      editing: true,
      text: this.props.card.text,
      desc: this.props.card.desc
    });
  }

  endEditing = () => this.setState({ hover: false, editing: false });

  editCard = async (text, desc) => {
    const { card, dispatch } = this.props;

    this.endEditing();

    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card._id, cardText: text, cardDesc: desc }
    });
  };

  deleteCard = async () => {
    const { listId, card, dispatch } = this.props;

    dispatch({
      type: "DELETE_CARD",
      payload: { cardId: card._id, listId }
    });
  };

  //change color function
  changeColor= async(Event) =>{
    this.setState({btn:Event});

  }

  render() {
    const { card, index } = this.props;
    const { hover, editing, btn } = this.state;



    if (!editing) {
      return (
        <Draggable draggableId={card._id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className=" Card"
              onMouseEnter={this.startHover}
              onMouseLeave={this.endHover}
              //style = {{border: `2px solid ${btn}`}}
            >
              <button style ={{
                height: 35,
                width: 16,
                border: 'transparent',
                backgroundColor: btn,
              }}>
                </button>

              {hover && (
                <div className="Card-Icons">
                  <div className="Card-Icon" onClick={this.startEditing}>
                    <ion-icon name="create" />
                  </div>
                </div>
              )}

              {card.text}
            </div>
          )}
        </Draggable>
      );
    } else {
      return (
        <CardEditor
          text={card.text}
          onSave={this.editCard}
          onDelete={this.deleteCard}
          onCancel={this.endEditing}
          onColor={this.changeColor}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);
