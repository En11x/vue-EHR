//简洁版文章介绍卡片
<template>
 <div class='article-card'>
     <div class='wrap'>
         <h2 class='title'>
             <span>在线考试系统（vue2 + elementui + express4 + MongoDB）</span>
         </h2>
         <div class='time'>
             <span>05-05</span>
         </div>
     </div>
 </div>
</template>

<script>
 export default {
     name:'ArticleCard2',
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style lang='stylus' scoped>
.article-card
    margin 30px 0
    padding 25px 
    box-shadow 0 0 5px rgba(202,203,203,0.5)
    .wrap
        position relative
        border-bottom 1px dashed #ccc
        line-height 2
        transition all 0.4s
        &:before
            content ''
            position absolute
            left 0
            top 14px
            width 8px
            height 8px
            margin-left -4px
            background-color #bbb
            border-radius 50%
            border 1px solid #fff
            transition all 0.4s
        &:hover
            border-bottom-color #666
            &:before
                background #222
        h2
            font-size 16px
            font-weight normal
            line-height inherit
            margin 20px 0 10px 60px
        .time
            position absolute
            font-size 12px
            left 20px
            top 5px
 
</style>
