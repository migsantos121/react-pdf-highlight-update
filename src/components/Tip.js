// @flow

import React, { Component } from "react";

import "../style/Tip.css";

type State = {
  compact: boolean,
  isLink: boolean,
  text: string,
  emoji: string
};

type Props = {
  onConfirm: (comment: { text: string, emoji: string }) => void,
  onOpen: () => void,
  onUpdate?: () => void
};

class Tip extends Component<Props, State> {
  state = {
    compact: true,
    isLink: false,
    text: "",
    emoji: ""
  };

  state: State;
  props: Props;

  // for TipContainer
  componentDidUpdate(nextProps: Props, nextState: State) {
    const { onUpdate } = this.props;

    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate();
    }
  }

  render() {
    const { onConfirm, onOpen } = this.props;
    const { compact, isLink, text, emoji } = this.state;

    return (
      <div className="Tip">
        {compact ? (
          <div className="Tip__compact">
            <div
              className="Add__highlight"
              onClick={() => {
                onOpen();
                this.setState({ compact: false, isLink: false });
              }}
            >
              Add highlight
            </div>
            <div
              className="Add__link"
              onClick={() => {
                onOpen();
                this.setState({ compact: false, isLink: true });
              }}
            >
              Add link
            </div>
          </div>
        ) : (
          <form
            className="Tip__card"
            onSubmit={event => {
              event.preventDefault();
              onConfirm({ text, emoji, isLink });
            }}
          >
            {!isLink ? (

              <div>
                <textarea
                  width="100%"
                  placeholder="Your comment"
                  autoFocus
                  value={text}
                  onChange={event => this.setState({ text: event.target.value })}
                  ref={node => {
                    if (node) {
                      node.focus();
                    }
                  }}
                />
                <div>
                  {["💩", "😱", "😍", "🔥", "😳", "⚠️"].map(_emoji => (
                    <label key={_emoji}>
                      <input
                        checked={emoji === _emoji}
                        type="radio"
                        name="emoji"
                        value={_emoji}
                        onChange={event =>
                          this.setState({ emoji: event.target.value })
                        }
                      />
                      {_emoji}
                    </label>
                  ))}
                </div>
              </div>
            ) : (

              <div>
                <textarea
                  width="100%"
                  placeholder="Your Link"
                  autoFocus
                  value={text}
                  onChange={event => this.setState({ text: event.target.value })}
                  ref={node => {
                    if (node) {
                      node.focus();
                    }
                  }}
                />
              </div>
            )}
            <div>
              <input type="submit" value="Save" />
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Tip;
