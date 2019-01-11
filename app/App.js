import React, { Component } from 'react'
import c from './App.scss'

const playerHeight = 50;
const playerWidth = 200;

export default class App extends Component {
  state = {
    playerX: 0
  }

  handleMouseMove = e => {
    this.setState({
      playerX: e.clientX
    })
  }

  render() {
    return (
      <div
        className={c.app}
        onMouseMove={this.handleMouseMove}>
        <div
          className={c.player}
          style={{
            width: playerWidth,
            height: playerHeight,
            left: this.state.playerX - (playerWidth / 2)
          }}
        />
      </div>
    )
  }
}