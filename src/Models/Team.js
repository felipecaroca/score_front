import noimage from '../assets/noimage.png'

class Team {
  constructor(teamData) {
    this.id = null
    this.name = teamData.name
    this.logo = teamData.logo ? teamData.logo : noimage
  }


}

export {Team}