import {FirebaseStoreHelper} from "../Helpers/FirebaseStoreHelper"
import {Team} from "./Team";

class SoccerGame {
  constructor(data = {}) {
    this.id = data.id?data.id:null
    this.gameDate = data.gameDate?data.gameDate:''
    this.gameTime = data.gameTime?data.gameTime: ''
    this.local = data.local?data.local:new Team()
    this.visit = data.visit?data.visit:new Team()
    this.time = '00:00'
    this.secondCounter = 0
  }

  static Get(id, onsuccess){
    FirebaseStoreHelper.processMethod('getSoccerGame', onsuccess, {id: id})
  }

  static List(search, onsuccess, onFinally){
    FirebaseStoreHelper.processMethod('getSoccerGames', onsuccess, search, onFinally)
  }

  Post(onsuccess){
    FirebaseStoreHelper.processMethod('postSoccerGame', onsuccess, this.asData())
  }

  Update(onsuccess){
    FirebaseStoreHelper.processMethod('putSoccerGame', onsuccess, this.asData())
  }

  Delete(onsuccess){
    FirebaseStoreHelper.processMethod('deleteSoccerGame', onsuccess, this.asData())
  }

  asData(){
    return {
      id: this.id,
      gameDate: this.gameDate,
      gameTime: this.gameTime,
      local: this.local,
      visit: this.visit,
      time: this.time,
      secondCounter: this.secondCounter
    }
  }
}

export {SoccerGame}