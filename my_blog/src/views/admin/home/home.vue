//首页
<template>
	<div class="home">
		<div class="filter"></div>

		<h1 class="title">欢迎来到EHR-人力资源管理系统</h1>

		<img :src="require('@/assets/login/loginImg.jpg')" alt="首页图片">
	</div>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {}
	},
	components: {}
}
</script>

<style lang='stylus' scoped>
.home
	width: 100%
	height: 100%
	position: relative

	.filter
		width: 100%
		height: 100%
		position: absolute
		background: rgba(0, 0, 0, 0.4)

	.title
		position: absolute
		top: 30%
		left: 50%
		color: #fff
		margin-left: -200px
		animation showTop 1s ease-in-out

	img
		width: 100%
		height: 100%

@keyframes showTop {
	from{
		transform translateY(-100px)
		opacity 0
	}
	to{
		transform translateY(0)
		opacity 1
	}
}
</style>
