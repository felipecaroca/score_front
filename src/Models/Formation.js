import {FirebaseStoreHelper} from "../Helpers/FirebaseStoreHelper";

class Formation {

  constructor(data = {}) {
    this.id = data.id?data.id:null
    this.number = data.number?data.number:''
    this.playerId = data.playerId?data.playerId:null
    this.teamId = data.teamId?data.teamId:null
    this.isHolder = data.isHolder?data.isHolder:true
    this.soccerGameId = data.soccerGameId?data.soccerGameId:null
    this.goals = data.goals?data.goals:null
    this.cards = data.cards?data.cards:null
    this.change = data.change?data.change:null
  }
  static Get(id, onsuccess){
    FirebaseStoreHelper.processMethod('getFormation', onsuccess, {id: id})
  }

  static List(search, onsuccess, onFinally){
    FirebaseStoreHelper.processMethod('getFormations', onsuccess, search, onFinally)
  }

  Post(onsuccess){
    FirebaseStoreHelper.processMethod('postFormation', onsuccess, this.asData())
  }

  Update(onsuccess){
    FirebaseStoreHelper.processMethod('putFormation', onsuccess, this.asData())
  }

  Delete(onsuccess){
    FirebaseStoreHelper.processMethod('deleteFormation', onsuccess, this.asData())
  }

  asData(){
    return {
      id: this.id,
      number: this.number,
      playerId: this.playerId,
      teamId: this.teamId,
      isHolder: this.isHolder,
      soccerGameId: this.soccerGameId
    }
  }
}

export {Formation}