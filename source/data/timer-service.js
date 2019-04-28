import {registerObject, fireEvent, registerEvent, chkSt} from 'absevents'

const timerms = 5000
const maxTimeOuts = 3
const repeatTimes = 2

registerObject('timer-service', {timers:{}})

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

// const timeoutHandler = function(item){
//   item.repetitions.forEach(rep=>{
//     if(rep.status == 'progress'){
//       if(rep.times<repeatTimes){
//         rep.times++
//         startNewTimeout(item, true)
//       }
//     }
//   })
// }
//
// const startNewTimeout = function(item, isAgain){
//   if(item.repetitions==null){
//     item.repetitions = []
//   }
//   if(!isAgain){
//     item.repetitions.push({status:'progress', times:1})
//   }
//   const timerid = setTimeout(()=>timeoutHandler(item), 5000)
//   chkSt('timer-service', 'timers')[item.id] = timerid
// }
