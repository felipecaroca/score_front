import {FirebaseStoreHelper} from "../Helpers/FirebaseStoreHelper";

class Goal {
  constructor(data = {}) {
    this.id = data.id?data.id:new Date().getTime()
    this.formationId = data.formationId?data.formationId:''
    this.minute = data.minute?data.minute:''
  }

  Post(onsuccess){
    FirebaseStoreHelper.processMethod('postGoal', onsuccess, this.asData())
  }

  Delete(onsuccess){
    FirebaseStoreHelper.processMethod('deleteGoal', onsuccess, this.asData())
  }

  asData(){
    return {
      id: this.id,
      formationId: this.formationId,
      minute: this.minute
    }
  }
}

export {Goal}