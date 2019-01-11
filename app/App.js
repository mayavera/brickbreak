import React, { Component } from 'react'
import c from './App.scss'

const playerHeight = 20
const playerWidth = 100
const ballRadius = 10
const initialBallX = 600
const initialBallY = 880
const initialBallVX = 1
const initialBallVY = 1

export default class App extends Component {
  state = {
    playerX: playerWidth / 2,
    playerY: playerHeight / 2,
    ballX: initialBallX,
    ballY: initialBallY,
    ballVX: initialBallVX,
    ballVY: initialBallVY
  }

  step = () => {
    let { ballX, ballY, ballVX, ballVY, playerY, playerX, worldHeight, worldWidth } = this.state

    let playerTop, playerBottom, playerLeft, playerRight
    function refreshPlayer() {
      playerTop = playerY + (playerHeight / 2)
      playerLeft = playerX - (playerWidth / 2)
      playerRight = playerX + (playerWidth / 2)
    }
    refreshPlayer()

    let newBallX = ballX + ballVX
    let newBallY = ballY + ballVY

    let ballTop, ballBottom, ballRight, ballLeft
    function refreshBall() {
      ballTop = newBallY + ballRadius
      ballBottom = newBallY - ballRadius
      ballRight = newBallX + ballRadius
      ballLeft = newBallX - ballRadius
    }
    refreshBall()

    if (
      ballBottom < playerTop
      && ballVY < 0
      && ballLeft < playerRight
      && ballRight > playerLeft
    ) {
      ballVY *= -1
      refreshBall()
    }

    if (ballBottom < 0 && ballVY < 0) {
      ballVY *= -1
      newBallY = ballRadius
      refreshBall()
    }

    if (ballTop > worldHeight && ballVY > 0) {
      ballVY *= -1
      newBallY = worldHeight - ballRadius
      refreshBall()
    }

    if (ballLeft < 0 && ballVX < 0) {
      ballVX *= -1
      newBallX = ballRadius
      refreshBall()
    }

    if (ballRight > worldWidth && ballVX > 0) {
      ballVX *= -1
      newBallX = worldWidth - ballRadius
      refreshBall()
    }

    this.setState({
      ballX: newBallX,
      ballY: newBallY,
      ballVY,
      ballVX
    })
  }

  syncWorldDimensions = () => {
    this.setState({
      worldWidth: this.world.offsetWidth,
      worldHeight: this.world.offsetHeight
    })
  }

  componentDidMount() {
    this.ticker = setInterval(this.step, 10)
    this.resizeHandler = window.addEventListener('resize', this.syncWorldDimensions)
    this.syncWorldDimensions()
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
    window.removeEventListener(this.resizeHandler)
  }

  handleMouseMove = e => {
    this.setState({
      playerX: e.clientX
    })
  }

  render() {
    const { ballX, ballY, playerX, playerY } = this.state

    return (
      <div
        className={c.app}
        onMouseMove={this.handleMouseMove}
        ref={element => { this.world = element }}
      >
        <div
          className={c.ball}
          style={{
            width: ballRadius * 2,
            height: ballRadius * 2,
            left: ballX - ballRadius,
            bottom: ballY - ballRadius
          }}
        />
        <div
          className={c.player}
          style={{
            width: playerWidth,
            height: playerHeight,
            left: playerX - (playerWidth / 2),
            bottom: playerY - (playerHeight / 2)
          }}
        />
      </div>
    )
  }
}