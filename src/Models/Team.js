import noimage from '../assets/noimage.png'
import {FirebaseStoreHelper} from "../Helpers/FirebaseStoreHelper";

class Team {

  constructor(teamData = {}) {
    this.id = teamData.id? teamData.id : null
    this.name = teamData.name
    this.logo = teamData.logo ? teamData.logo : noimage
  }

  static Get(id, onsuccess){
    FirebaseStoreHelper.processMethod('getTeam', onsuccess, {id: id})
  }

  static List(search, onsuccess, onFinally){
    FirebaseStoreHelper.processMethod('getTeams', onsuccess, search, onFinally)
  }

  Post(onsuccess){
    FirebaseStoreHelper.processMethod('postTeam', onsuccess, this.asData())
  }

  Update(onsuccess){
    FirebaseStoreHelper.processMethod('putTeam', onsuccess, this.asData())
  }

  Delete(onsuccess){
    FirebaseStoreHelper.processMethod('deleteTeam', onsuccess, this.asData())
  }

  asData(){
    return {
      id: this.id,
      name: this.name,
      logo: this.logo
    }
  }
}

export {Team}