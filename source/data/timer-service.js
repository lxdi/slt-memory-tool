import {registerObject, fireEvent, registerEvent, chkSt} from 'absevents'

const timerms = 5000
const maxTimeOuts = 3
const repeatTimes = 2

registerEvent('timer-service', 'start-repetition', (stStr, item)=>{
  if(item.repetitions==null){
    item.repetitions = []
  }
  item.repetitions.push({status:'progress', startTime: new Date().getTime()})
})

registerEvent('timer-service', 'repetition-done', (stStr, item)=>{
  item.repetitions.forEach(rep=>{
    if(rep.status == 'progress'){
      rep.status = 'done'
      if(item.repetitions.length<=maxTimeOuts){
        item.repetitions.push({status:'progress', startTime: new Date().getTime()})
      }
    }
  })
})
