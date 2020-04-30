import {FirebaseStoreHelper} from "../Helpers/FirebaseStoreHelper"

class Card {
  constructor(data) {
    this.id = data.id?data.id:new Date().getTime()
    this.formationId = data.formationId
    this.isYellow = data.isYellow
    this.minute = data.minute
  }
  Post(onsuccess){
    FirebaseStoreHelper.processMethod('postCard', onsuccess, this.asData())
  }

  Delete(onsuccess){
    FirebaseStoreHelper.processMethod('deleteCard', onsuccess, this.asData())
  }

  asData(){
    return {
      id: this.id,
      formationId: this.formationId,
      isYellow: this.isYellow,
      minute: this.minute
    }
  }
}

export {Card}