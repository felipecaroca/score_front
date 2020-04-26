import {FirebaseStoreHelper} from "../Helpers/FirebaseStoreHelper";

class Player {
  constructor(data = {}) {
    this.id = data.id?data.id:null
    this.name = data.name?data.name:''
    this.lastName = data.lastName?data.lastName:''
    this.mail = data.mail?data.mail:''
    this.teamId = null
  }

  static Get(id, onsuccess){
    FirebaseStoreHelper.processMethod('getPlayer', onsuccess, {id: id})
  }

  static List(search, onsuccess, onFinally){
    FirebaseStoreHelper.processMethod('getPlayers', onsuccess, search, onFinally)
  }

  Post(onsuccess){
    FirebaseStoreHelper.processMethod('postPlayer', onsuccess, this.asData())
  }

  Update(onsuccess){
    FirebaseStoreHelper.processMethod('putPlayer', onsuccess, this.asData())
  }

  Delete(onsuccess){
    FirebaseStoreHelper.processMethod('deletePlayer', onsuccess, this.asData())
  }

  asData(){
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      mail: this.mail,
      teamId: this.teamId
    }
  }

}
export {Player}