// 页面底部组件
<template>
 <div class='footer'>
     <div class='container'>
         <div class='copyright'>
             © 2018 — 
             <span class='toYear'>2019</span>
             <span>
                 <i class="iconfont icon-about"></i>
             </span>
             <span class='author'>FinGet—前端我一直在路上</span>
         </div>
         <div class='powered-by'>
            <i class="iconfont icon-base-config"></i>             
            <span class='visit-users'>
				本站访客数:
				<span class='value'>11820</span>
			</span>
			<span class='divider'>|</span>
            <i class="iconfont icon-eye"></i>
			<span class='visit-counts'>
				本站总访问量:
				<span class='value'>12220</span>
			</span>
         </div>
     </div>
 </div>
</template>

<script>
 export default {
     name:'m-footer',
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style lang='stylus' scoped>
.footer
    padding 10px 0
    margin-top 30px
    background-color #f5f5f5
    width 100%
    color #666
    line-height 2
	.copyright
		margin-top 20px
		line-height 2
	.iconfont-about
		display inline-block
		margin 0 5px
	.divider
		margin 0 0.5em
</style>
