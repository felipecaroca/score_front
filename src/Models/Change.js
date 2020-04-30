import {FirebaseStoreHelper} from "../Helpers/FirebaseStoreHelper"

class Change {
  constructor(data) {
    this.id = data.id?data.id:''
    this.formationIn = data.formationIn
    this.formationOut = data.formationOut
    this.isLocal = !!data.isLocal
    this.time = data.time
    this.half = data.half
  }

  Post(onsuccess){
    FirebaseStoreHelper.processMethod('postChange', onsuccess, this.asData())
  }

  Delete(onsuccess){
    FirebaseStoreHelper.processMethod('deleteChange', onsuccess, this.asData())
  }

  asData(){
    return {
      id: this.id,
      formationIn: this.formationIn,
      formationOut: this.formationOut,
      time: this.time,
      half: this.half,
      isLocal: this.isLocal
    }
  }
}

export {Change}