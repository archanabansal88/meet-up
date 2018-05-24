import React, {Component} from 'react'

class Carousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      width: 0
    }
    this.handleLeftButtonClick = this.handleLeftButtonClick.bind(this)
    this.handleRightButtonClick = this.handleRightButtonClick.bind(this)
  }

  componentDidMount () {
    this.setState({width: this.carouselContainer.children[0].offsetWidth})
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
    let {selectedIndex, width} = this.state

    if ((selectedIndex * width) + this.carouselContainer.offsetWidth < this.props.children.length * width) {
      selectedIndex++
    }
    this.setState({
      selectedIndex: selectedIndex
    })
  }

  render () {
    const {selectedIndex, width} = this.state
    let translatex = (selectedIndex * width)

    if (this.carouselContainer && translatex + this.carouselContainer.offsetWidth > this.props.children.length * width) {
      translatex = this.props.children.length * width - this.carouselContainer.offsetWidth
    }

    translatex = -translatex
    return (
      <div className='column is-12 is-paddingless container'>
        <div className='is-overlay' style={{'top': '50%', 'z-index': '1', 'left': '-10px', 'right': 'initial'}}>
          <a className='button is-rounded is-overlay' onClick={this.handleLeftButtonClick}>&lt;</a>
        </div>
        <div className='is-clipped'>
          <div ref={(input) => { this.carouselContainer = input }} className='is-flex' style={{transform: `translateX(${translatex}px)`, 'transition': 'transform 0.25s cubic-bezier(.4, 0,.2, 1)'}}>
            {this.props.children.map(item =>
              <div>{item}</div>
            )}
          </div>
        </div>
        <div className='is-overlay' style={{'top': '50%', 'z-index': '1', 'right': '-22px', 'left': 'initial'}}>
          <a className='button is-rounded is-overlay' onClick={this.handleRightButtonClick}>&gt;</a>
        </div>
      </div>
    )
  }
}

export default Carousel
