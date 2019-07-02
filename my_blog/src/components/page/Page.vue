//自己封装分页组件
<template>
 <div class='page'>
     <span class='page-number current'>1</span>
     <router-link class='page-number' to='/'>2</router-link>
     <span class='space'>…</span>
     <router-link class='page-number' to='/'>4</router-link>
     <router-link class='next' to='/'>></router-link>
 </div>
</template>

<script>
 export default {
     name:'Page',
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style lang='stylus' scoped>
.page
    border-top 1px solid #eee
    .prev,.next,.page-number
        display inline-block
        position relative
        margin 0 10px
        padding 0 11px
        line-height 2
        border-bottom 0
        border-top 1px solid #eee
        transition-property border-color
        transition-duration 0.2s
        transition-timing-function ease-in-out
        transition-delay 0s
        &:hover
            border-top-color #222
    .page-number.current
        color #fff
        background-color #ccc
        border-top-color #ccc
 
</style>
