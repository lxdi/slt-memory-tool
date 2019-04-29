import React from 'react';
import ReactDOM from 'react-dom';
import {fireEvent} from 'absevents'
import {ItemsList} from './items-list'

export class Main extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return <div class='main-div'>
        <div>
          <a href='#' onClick={()=>fireEvent('items-rep', 'create-new', [{}])}>+ Add</a>
        </div>
        <ItemsList />
    </div>
  }
}

//<div style={{margin:'3px', padding:'5px', border:'1px solid grey', borderRadius:'8px'}}>
