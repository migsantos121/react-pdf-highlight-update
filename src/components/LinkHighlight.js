// @flow

import React, { Component } from "react";

import "../style/LinkHighlight.css";

import type { T_LTWH } from "../types.js";

type Props = {
  position: {
    boundingRect: T_LTWH,
    rects: Array<T_LTWH>
  },
  onClick?: () => void,
  onMouseOver?: () => void,
  onMouseOut?: () => void,
  comment: {
    emoji: string,
    text: string
  },
  isScrolledTo: boolean
};

type State = {
  hover: boolean
};

class LinkHighlight extends Component<Props, State> {
  state = {
    hover: false
  };

  state: State;
  _onMouseOver(e) {
  	this.setState({hover: true});
  	if (this.props.onMouseOver)
  		this.props.onMouseOver(e);
  }

  _onMouseOut(e) {
  	this.setState({hover: false});
  	if (this.props.onMouseOut)
  		this.props.onMouseOut(e);
  }

  _onClick(e) {
  	if (this.props.onClick)
  		this.props.onClick(e);
  }

  render() {
  	const self = this;
    const {
      position,
      onClick,
      onMouseOver,
      onMouseOut,
      comment,
      isScrolledTo
    } = this.props;

    const {
    	hover
    } = this.state;

    const { rects, boundingRect } = position;

    return (
      <div
        className={`LinkHighlight ${isScrolledTo ? "LinkHighlight--scrolledTo" : ""}`}
      >
        {comment ? (
          <div
            className="LinkHighlight__emoji"
            style={{
              left: 20,
              top: boundingRect.top
            }}
          >
            {comment.emoji}
          </div>
        ) : null}
        <div className="LinkHighlight__parts">
          {rects.map((rect, index) => (
            <div
              onMouseOver={this._onMouseOver.bind(self)}
              onMouseOut={this._onMouseOut.bind(self)}
              onClick={this._onClick.bind(self)}
              key={index}
              style={rect}
              className={`LinkHighlight__part ${hover? "hover": ""}`}
            >
              <div
              	className="LinkHighlight__underline"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default LinkHighlight;
