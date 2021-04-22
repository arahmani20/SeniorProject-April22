import "../styles/CardEditor.css";

import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";

class CardEditor extends Component {
  state = {
    text: this.props.text || "",
    //desc: this.props.desc || "",
    btn:''
  };

  handleChangeText = event => this.setState({ text: event.target.value });

  onEnter = e => {
    const { text } = this.state;

    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.onSave(text);
    }
  };
  color=(Event) => {
    this.setState({btn:Event.target.value});
    this.props.onColor(Event.target.value)
  };

  render() {
    const { text,btn } = this.state;
    const { onSave, onCancel, onDelete, adding } = this.props;

    return (
      <div className="Edit-Card">
        <div className="Card">
          <TextareaAutosize
            autoFocus
            className="Edit-Card-Textarea"
            placeholder="Enter the text for this card:"
            value={text}
            onChange={this.handleChangeText}
            onKeyDown={this.onEnter}
          />
        </div>
        {adding ?
        <EditButtons
        handleSave={() => onSave(text)}
        saveLabel={adding ? "Add card" : "Save"}
        handleDelete={onDelete}
        handleCancel={onCancel}
        //handleColor={this.color}
        red={btn}
      />
      :
      <EditButtons
        handleSave={() => onSave(text)}
        saveLabel={adding ? "Add card" : "Save"}
        handleDelete={onDelete}
        handleCancel={onCancel}
        handleColor={this.color}
        red={btn}
      />
        }
      </div>
    );
  }
}

export default CardEditor;
