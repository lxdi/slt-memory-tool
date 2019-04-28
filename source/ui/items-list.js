import React from 'react';
import ReactDOM from 'react-dom';
import {TimeLine} from './time-line'
import {chkSt, registerReaction, fireEvent} from 'absevents'

export class ItemsList extends React.Component {
  constructor(props){
    super(props)

    registerReaction('items-list-ui', 'items-rep', 'create-new', (stStr)=>this.setState({}))
    registerReaction('items-list-ui', 'timer-service', ['start-repetition', 'repetition-done'], (stStr, item)=>this.setState({}))

  }

  render(){
    const itemsUI = getItemsUI(this, chkSt('items-rep', 'items'))
    return <div>
            {itemsUI}
          </div>
  }
}

const getItemsUI = function(component, items){
  const result = []
  items.forEach(item=>{
    const currentRep = getCurrentRep(item)
    result.push(<div key={item.id} style={{border:'1px solid grey', padding:'3px', margin:'3px'}}>
              <div>
                <div style={{width:'80%', display:'inline-block'}}>
                  <input style={{width:'100%', display:'inline-box'}} type="text" value={item.title} onChange={(event)=>{handleTitleInput(component, event, item)}} />
                </div>
                <div style={{display:'inline-block', margin:'3px'}}>
                  <div style={{border:'1px solid lightgrey', borderRadius:'5px', display:'inline-block', padding:'3px', margin:'2px'}}>
                    {item.repetitions==null?'0':item.repetitions.length}
                  </div>
                </div>
                <div style={{display:'inline-block', marginLeft:'3px'}}>
                  <a href='#' onClick={()=>fireEvent('timer-service', 'repetition-done', [item])}>Done</a>
                </div>
              <div>
                </div>
                <div>
                  {currentRep!=null?<TimeLine startTime={currentRep.startTime} offset={5000}/>:null}
                </div>
              </div>
            </div>)
  })
  return result
}

const handleTitleInput = function(component, event, item){
  if(item.title == null && event.target.value!=null && event.target.value!=''){
    fireEvent('timer-service', 'start-repetition', [item])
  }
  item.title=event.target.value
  component.setState({})
}

const getCurrentRep = function(item){
  var result = null
  if(item.repetitions!=null){
    item.repetitions.forEach(rep=>{
      if(rep.status == 'progress'){
        result = rep
        return
      }
    })
  }
  return result
}

// const repetitionsUI = function(item){
//   const repCount = item.repetitions.length
//   var status = ''
//   item.repetitions.forEach(rep=>status=rep.status)
//   var color = 'lightgrey'
//   if(status!=''){
//     if(status=='done')
//   }
//   return
// }