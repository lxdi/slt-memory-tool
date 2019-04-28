import {registerEvent, registerObject, chkSt} from 'absevents'

var itemsIds = 1;

const repTitle = 'items-rep'

registerObject(repTitle, {items:[]})

registerEvent(repTitle, 'create-new', (stStr, item)=>{
  item.id = itemsIds++;
  chkSt(repTitle, 'items').push(item)
})
