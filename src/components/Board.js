import "../styles/Board.css";
import "./index.css";

import React, {Component} from "react";
// import ReactDom from 'react-dom';
import Popup from 'react-popup';
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

//board & card compatibility
import List from "./List";
import AddList from "./AddList";

class Board extends Component {
  state = {
    addingList: false
  };

  toggleAddingList = () =>
    this.setState({ addingList: !this.state.addingList });

  handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the allowed zones
    if (!destination) return;

    const { dispatch } = this.props;

    // Move list
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        dispatch({
          type: "MOVE_LIST",
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index
          }
        });
      }
      return;
    }

    // Move card
    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index
        }
      });
    }
  };

  render() {
    const { board } = this.props;
    const { addingList } = this.state;

    return (
      <div>
        <div id="popupContainer"><Popup /></div>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="COLUMN">
            {(provided, _snapshot) => (
              <div className="Board" ref={provided.innerRef}>
                {board.lists.map((listId, index) => {
                  return <List listId={listId} key={listId} index={index} />; //List usage
                })}

                {provided.placeholder}

                <div className="Add-List">
                  {addingList ? (
                    <AddList toggleAddingList={this.toggleAddingList} /> //AddList usage
                  ) : (
                    <div
                      onClick={this.toggleAddingList}
                      className="Add-List-Button"
                    >
                      <ion-icon name="add" /> Add a list
                    </div>
                  )}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        
      </div>
    );
  }
}

class Prompt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.defaultValue
    };

    this.onChange = (e) => this._onChange(e);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.props.onChange(this.state.value);
    }
  }

  _onChange(e) {
    let value = e.target.value;

    this.setState({ value: value });
  }

  render() {
    return <input type = "text" placeholder = { this.props.placeholder } className = "mm-popup__input" value = { this.state.value } onChange = { this.onChange } />;
  }
}

/** Prompt plugin */
Popup.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
  let promptValue = null;
  let promptChange = function (value) {
    promptValue = value; //value = user text input
  };

  this.create({
    title: 'Task Details:',
    content: <Prompt onChange={ promptChange } placeholder={ placeholder } value={ defaultValue } />,
    buttons: {
      left: ['cancel'],
      right: [{
        text: 'Save',
        key: '⌘+s', //macOS
        className: 'success',
        action: function () {
          callback(promptValue);
          Popup.close();

        }
      }]
    }
  });
});

const mapStateToProps = state => ({ board: state.board });

export default connect(mapStateToProps)(Board);
