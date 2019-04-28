import React from 'react';
import ReactDOM from 'react-dom';

const colorSchemes = [{left:'green', right:'white'}, {left:'yellow', right:'green'}, {left:'red', right:'yellow'}]

//props: startTime, offset
export class TimeLine extends React.Component {
  constructor(props){
    super(props)
    this.state = {length:300, currentColorScheme:0, intervalId:setInterval(()=>this.setState({}), 1000)}

  }

  render(){
    handleCurrentPos(this)
      return  <div style={{width:(this.state.length+2)+'px', height:'4px', border:'1px solid lightgrey' }}>
                    <div style={{backgroundColor: colorSchemes[this.state.currentColorScheme].left, width:this.state.currentTimePx+'px', float:'left', height:'100%'}}></div>
                    <div style={{backgroundColor: colorSchemes[this.state.currentColorScheme].right, width:this.state.lastPx+'px', float:'left', height:'100%'}}></div>
                  </div>
  }
}

const handleCurrentPos = function(component){
  const currentTime = new Date().getTime()
  const currenPos = (currentTime-component.props.startTime)/(component.props.offset)
  component.state.currentTimePx = component.state.length*currenPos
  component.state.lastPx = 300 - component.state.currentTimePx
  if(component.state.currentTimePx>=component.state.length){
    component.props.startTime = component.props.startTime + component.props.offset
    component.state.currentColorScheme++
    if(component.state.currentColorScheme>=colorSchemes.length){
      component.state.currentColorScheme--
      clearInterval(component.state.intervalId)
      component.state.currentTimePx = component.state.length
      component.state.lastPx = 0
    } else{
      handleCurrentPos(component)
    }
  }
}
