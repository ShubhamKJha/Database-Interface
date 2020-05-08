import React from 'react';
import PropTypes from "prop-types";
import { connect }  from 'react-redux';
import { increment, reset, decrement, pressEnter } from '../actions';

export function getTextAreaPosition(textArea) {
  return {
    currentLine: textArea.value.substr(0, textArea.selectionStart).split("\n")
      .length,
    totalLines: textArea.value.split("\n").length
  };
}



export class SampleConsoleInputUnconnected extends React.Component {
    static propTypes = {
        consoleText: PropTypes.string.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.textAreaRef = React.createRef();
        this.containerRef = React.createRef();
        this.handleTextInput = this.handleTextInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            consoleText: this.props.consoleText,
            prevPropsConsoleText: this.props.consoleText
        };
    }
    handleTextInput(event) {
        // this check is required to prevent the insertion of a newline
        // after eval b/c of a pernicious race condition between the
        // keypress and onchange events, setState, and getDerivedStateFromProps
        if (event.target.value !== "\n") {
          this.setState({ consoleText: event.target.value });
        }
      }
  onFirstLine() {
      const { currentLine } = getTextAreaPosition(this.textAreaRef.current);
      return currentLine === 1;
    }

  onLastLine() {
    const { currentLine, totalLines } = getTextAreaPosition(
      this.textAreaRef.current
    );
    return currentLine === totalLines;
  }

  handleKeyDown(event) {
    if (event.key === "ArrowUp" && this.onFirstLine()) {
      this.props.increment();
    }
    if (event.key === "ArrowDown" && this.onLastLine()) {
      this.props.decrement();
    }
    if (event.key === "ArrowLeft" && this.onLastLine()) {
      this.props.reset();
    }
    if (event.key === "Enter" && !event.shiftKey) {
      this.props.pressEnter();
      this.setState({ consoleText: "" });
    }
  }

  render() {
    return (
      <div
        ref={this.containerRef}
        className="console-text-input-container"
        style={{
          maxHeight: "27px", // default max-height
          flexGrow: 2
        }}
      >
        <textarea
          name="text"
          spellCheck={false}
          ref={this.textAreaRef}
          onChange={this.handleTextInput}
          onKeyDown={this.handleKeyDown}
          rows="1"
          style={{
            resize: "none",
            lineHeight: "20px",
            padding: "3px 0px 0px 0px",
            height: "100%",
            width: "100%",
            border: "none",
            boxSizing: "border-box",
            outline: "none",
            margin: "0px",
            fontSize: "13px",
            // fontFamily: THEME.client.console.fontFamily
          }}
          value={this.state.consoleText}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  increment,
  decrement,
  reset,
  pressEnter
};

export const mapStateToProps = (state) => ({
    consoleText: state.consoleInput.consoleText
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleConsoleInputUnconnected);
