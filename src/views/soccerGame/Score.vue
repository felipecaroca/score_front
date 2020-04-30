<template>
  <score-view :soccerGameId="soccerGameId"/>
</template>

<script>
  export default {
    data:()=>({
      soccerGameId:null
    }),
    created() {
      if(this.$route.params.id)
        this.soccerGameId = this.$route.params.id
    },
    mounted() {
      this.removeElement('header')
      this.removeElement('footer')
    },
    methods:{
      removeElement(element){
        let tag = document.getElementsByTagName(element)
        if (tag)
          tag[0].parentNode.removeChild(tag[0])
      }
    }
  }
</script>