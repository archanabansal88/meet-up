import React, {Component} from 'react'
import './style.css'

class Carousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0
    }
    this.handleLeftButtonClick = this.handleLeftButtonClick.bind(this)
    this.handleRightButtonClick = this.handleRightButtonClick.bind(this)
  }

  handleLeftButtonClick () {
    let {selectedIndex} = this.state
    if (selectedIndex > 0) {
      selectedIndex--
    }
    this.setState({
      selectedIndex: selectedIndex
    })
  }

  handleRightButtonClick () {
    let {selectedIndex} = this.state
    if (selectedIndex < this.props.children.length - 3) {
      selectedIndex++
    }
    this.setState({
      selectedIndex: selectedIndex
    })
  }

  render () {
    const {selectedIndex} = this.state
    const translatex = -(selectedIndex * 330)
    return (
      <div className='carousel'>
        <a className='carousel__arrow carousel__arrow--left' onClick={this.handleLeftButtonClick}>&lt;</a>
        <div className='carousel__wrapper'>
          <div className='carousel__content' style={{transform: `translateX(${translatex}px)`}}>
            {this.props.children.map((item, i) =>
              <div key={i}>{item}</div>
            )}
          </div>
        </div>
        <a className='carousel__arrow carousel__arrow--right' onClick={this.handleRightButtonClick}>&gt;</a>
      </div>
    )
  }
}

export default Carousel
