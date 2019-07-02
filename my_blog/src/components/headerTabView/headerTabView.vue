// 头部导航栏的组件
<template>
	<div id="header-tab-view">
		<div @click='selectTab(tab)' class="tab" v-for="(tab,index) in tabs" :key="index">
			<i class="iconfont" :class="tab.icon"></i>
			<span>{{tab.name}}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'header-tab-view',
	props: ['tabs'],
	data() {
		return {}
    },
    methods: {
        selectTab(tab){
            this.$router.push(tab.to)
        }  
    },
	components: {}
}
</script>

<style lang='stylus' scoped>
@import '~STYLUS/color.styl'

#header-tab-view
	position: relative
	font-size: 13px
	cursor: default
	animation: show 0.5s

	.tab
		display: inline-block
		padding: 3px 10px
		cursor: pointer
		color: $color-main
		background-color: #f5f5f5
		transition: all 0.5s
		border-radius: 2px

		&:hover
			background-color: #e1e1e1
			color: #222
		.iconfont
			font-size 12px
			margin-right 5px
		

@keyframes show
	from
		margin-top: -30px
		opacity: 0

	to
		margin-top: 0
		opacity: 1
</style>
