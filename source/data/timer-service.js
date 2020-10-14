import {registerObject, fireEvent, registerEvent, chkSt} from 'absevents'

const timerms = 5*60*1000
const repsDelays = [timerms, timerms*2, timerms*3, timerms*4, timerms*5]

//registerObject('timer-service', {timerms:timerms})

registerEvent('timer-service', 'start-repetition', (stStr, item)=>{
  if(item.repetitions==null){
    item.repetitions = []
  }
  repsDelays.forEach(delay => {
    item.repetitions.push({status:'waiting', offset: delay})
  })
  startRep(item.repetitions[0])
})

registerEvent('timer-service', 'repetition-done', (stStr, item)=>{
  for(var idx=0; idx<item.repetitions.length; idx++){
    var rep = item.repetitions[idx]
    if(rep.status == 'progress'){
      rep.status = 'done'
      if(idx+1<item.repetitions.length){
        startRep(item.repetitions[idx+1])
        break
      }
    }
  }
})

const startRep = function(rep){
  rep.status = 'progress'
  rep.startTime = new Date().getTime()
}
