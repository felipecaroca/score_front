import {FirebaseStoreHelper} from "../Helpers/FirebaseStoreHelper";

class Formation {

  constructor(data = {}) {
    this.id = data.id?data.id:null
    this.number = data.number?data.number:''
    this.playerId = data.playerId?data.playerId:null
    this.player = data.player?data.player:null
    this.teamId = data.teamId?data.teamId:null
    this.isHolder = !!data.isHolder
    this.soccerGameId = data.soccerGameId?data.soccerGameId:null
    this.goals = data.goals?data.goals:[]
    this.cards = data.cards?data.cards:[]
  }
  static Get(id, onsuccess){
    FirebaseStoreHelper.processMethod('getFormation', onsuccess, {id: id})
  }

  static List(search, onsuccess, onFinally){
    FirebaseStoreHelper.processMethod('listFormations', onsuccess, search, onFinally)
  }

  Post(onsuccess){
    FirebaseStoreHelper.processMethod('postFormation', onsuccess, this.asData())
  }

  Update(onsuccess){
    FirebaseStoreHelper.processMethod('updateFormation', onsuccess, this.asData())
  }

  Delete(onsuccess){
    FirebaseStoreHelper.processMethod('deleteFormation', onsuccess, this.asData())
  }

  asData(){
    return {
      id: this.id,
      number: this.number,
      playerId: this.playerId,
      player: this.player,
      teamId: this.teamId,
      isHolder: this.isHolder,
      soccerGameId: this.soccerGameId,
      goals: this.goals,
      cards: this.cards
    }
  }
}

export {Formation}