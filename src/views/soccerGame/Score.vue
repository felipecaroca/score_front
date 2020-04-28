<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <score-view :soccerGameId="soccerGameId" />

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {SoccerGame} from "../../Models/SoccerGame"


  export default {
    data:()=>({

      soccerGameId: null,
      soccerGame: null,
    }),
    created() {
      if(this.$route.params.id)
        this.soccerGameId = this.$route.params.id
    },
    methods:{
      getSoccerGame(){
        SoccerGame.Get({id: this.soccerGameId}, (res)=>{
          this.soccerGame = new SoccerGame(res.data)
        })
      }
    }
  }
</script>