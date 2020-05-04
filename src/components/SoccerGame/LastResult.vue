<template>
  <v-row>
    <v-col v-for="res in result" :key="res.id">
      <v-card :to="'soccer_games/'+res.id+'/result'">
        <v-card-text>
          <v-row>
            <v-col>
              <team-shield-view :team="res.local" width="50" />
            </v-col>
            <v-col align="center" justify="center" class="pt-12">
              <div>V/S</div>
              <div>{{res.gameDate}}</div>
              <div>{{res.gameTime}}</div>
            </v-col>
            <v-col>
              <team-shield-view :team="res.visit" width="50" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import {SoccerGame} from "../../Models/SoccerGame"

  export default {
    data:()=>({
      result: [],
    }),
    created() {
      this.getSoccerGames()
    },
    methods:{
      getSoccerGames(){
        SoccerGame.List({gameFinished: true,limit: 3}, (res)=>{
          this.result = []
          res.data.forEach(reg=>{
            if (this.result.length < 3)
              this.result.push(new SoccerGame(reg))
          })
        })
      }
    }
  }
</script>