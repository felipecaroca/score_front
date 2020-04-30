<template>
  <div>
    <p class="display-1" v-if="soccerGame">{{soccerGame.time}}</p>
    <p>Tiempo {{half}}</p>
  </div>

</template>

<script>
  export default {
    props:['soccerGame','isRunning'],
    data:()=>({
      interval: null
    }),
    created() {
      if (this.isRunning)
        this.runTime()
    },
    watch:{
      isRunning: function(){
        if (this.isRunning)
          this.runTime()
        else
          this.stopTime()
      }
    },
    methods:{
      runTime(){
        this.interval = setInterval(()=>{
          let initTime = null
          if (this.half === 1)
            initTime = this.soccerGame.initFirstTime
          else
            initTime = this.soccerGame.initLastTime
          if (initTime){
            let milliseconds = (new Date().getTime() - initTime) / 1000
            let minutes = '0'+parseInt(milliseconds / 60)
            let seconds = '0'+parseInt(milliseconds % 60)
            this.soccerGame.time = minutes.substring(minutes.length-2)+':'+seconds.substring(seconds.length-2)
          }
        },1000)
      },
      stopTime(){
        clearInterval(this.interval)
      }
    },
    computed:{
      half(){
        return this.soccerGame && !this.soccerGame.initLastTime? 1 : 2
      }
    }
  }
</script>
