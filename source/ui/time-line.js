import React from 'react';
import ReactDOM from 'react-dom';

const colorSchemes = [{left:'green', right:'white'}, {left:'yellow', right:'green'}, {left:'red', right:'yellow'}]

const updateInterval = 500

const defaultState = function(component){
  return {length:300, currentColorScheme:0, shift:0, currentTimePx:0, lastPx:0}
}

//props: startTime, offset
export class TimeLine extends React.Component {
  constructor(props){
    super(props)
    this.state = defaultState(this)
    handleCurrentPos(this)
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.startTime!=this.props.startTime){
      this.state = defaultState(this)
      setTimeout(()=>handleCurrentPos(this), updateInterval)
      return false
    }
    return true
  }

  render(){
    return  <div style={{width:(this.state.length+2)+'px', height:'4px', border:'1px solid lightgrey' }}>
                    <div style={{backgroundColor: colorSchemes[this.state.currentColorScheme].left, width:this.state.currentTimePx+'px', float:'left', height:'100%'}}></div>
                    <div style={{backgroundColor: colorSchemes[this.state.currentColorScheme].right, width:this.state.lastPx+'px', float:'left', height:'100%'}}></div>
                  </div>
  }
}

const handleCurrentPos = function(component){
  const state = component.state
  const props = component.props
  const currentTime = new Date().getTime()
  const currenPos = (currentTime-props.startTime)/(props.offset)
  const newCurrentTimePx = state.length*currenPos
  const newLastPx = state.length - state.currentTimePx
  if(newCurrentTimePx>=state.length){
    state.currentTimePx = state.length
    state.lastPx = 0
  } else {
    state.currentTimePx = newCurrentTimePx
    state.lastPx = newLastPx
    setTimeout(()=>handleCurrentPos(component), updateInterval)
  }
  component.setState({})
}
