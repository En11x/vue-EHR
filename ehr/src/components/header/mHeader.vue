// 头部导航组件
<template>
	<div id="m-header">
		<div class="header-wrap container">
			<div class="header-logo">
				<!-- <p class="line line-left"></p>
				<p class="blog-name">boke</p>
				<p class="line line-right"></p> -->
                <span class="line line-left">
					<i></i>
				</span>
				<span class="blog-name">boke</span>
				<span class="line line-right">
					<i></i>
				</span>
			</div>
			<header-tab-view :tabs="tabs"/>
		</div>
	</div>
</template>

<script>
import headerTabView from '@/components/headerTabView/headerTabView'
export default {
	name: 'm-header',
	data() {
		return {
			isPc:true, //判断在移动端还是在Pc端
			tabs: [
				{
					name: '首页',
					icon: 'icon-home',
					to: 'home'
				},
				{
					name: '关于',
					icon: 'icon-about',
					to: 'about'
				},
				{
					name: '分类/标签',
					icon: 'icon-tag',
					to: 'categories'
				},
				{
					name: '归档',
					icon: 'icon-archives',
					to: 'archives'
				},
				{
					name: '更多',
					icon: 'icon-more',
					to: 'morefunc'
				},
				{
					name: '搜索',
					icon: 'icon-search',
					to: 'search'
				}
			]
		}
	},
	watch:{

    },
	components: {
		headerTabView
	}

}
</script>

<style lang='stylus' scoped>
@import '~STYLUS/color.styl'

#m-header
	position: relative
	width: 100%
	background-color: #f5f5f5

	.header-wrap
		position: relative
		max-width: 1000px
		padding: 0 10px
		margin: 0 auto
		height: 90px
		display: flex
		flex-direction: row
		justify-content: space-between
		align-items: center

		.header-logo
			height: 100%
			display: flex
			flex-direction: column
			align-items: center
			justify-content: space-between
			font-size: 20px
			font-weight: bold
			padding: 25px
			overflow: hidden
			margin-left :-50px
			
			&:hover
				cursor: pointer
				.line-left i
					left -100%
				.line-right i 
					right -100%

			.line
				display block
				width: 80%
				overflow hidden
				i 
					position relative
					display block
					height 2px
					background #222
					transition all 0.5s
			.line-left
				i
					left 0
					animation: line-left 0.6s
			.line-right
				i
					right 0
					animation: line-right 0.6s

			.blog-name
				animation blog-name 1s

@keyframes line-left
	from
		left -100%

	to
		left 0

@keyframes line-right
	from
		right -100%

	to
		right 0

@keyframes blog-name
	0%
		margin-top: -60px
		opacity: 0

	50%
		margin-top: -60px
		opacity: 0
	100%
		margin-top: 0
		opacity: 1
</style>
