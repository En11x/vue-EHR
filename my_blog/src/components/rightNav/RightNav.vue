//右边导航组件
<template>
	<div class="right-nav" :style="{width:showRightNav?'320px':'0px'}">
		<div class="right-nav-wrap" :style="{width:showRightNav?'320px':'0px'}">
			<div class="menu-head">
				<span :class="{'active':showMenu}" @click="showMenu=true">文章目录</span>
				<span :class="{'active':!showMenu}" @click="showMenu=false">站点信息</span>
			</div>

			<div class="content-wrap">
				<!-- 文章目录 -->
				<transition name="slide-fade">
					<div class="article-menu"  v-show="showMenu">
						<article-menu />
					</div>
				</transition>
				<!-- 站点信息 -->
				<transition name="slide-fade">
					<div class="info-wrap" v-show="!showMenu">
						<img class="avatar" :src="require('@/assets/images/user.jpg')" alt="作者头像">
						<p class="name">blogname</p>
						<p class="motto">终于听见下雨的声音-</p>
						<div class="menu-wrap">
							<span class="menu-item">
								<p class="count">12</p>
								<p>文章</p>
							</span>
							<span class="menu-item">
								<p class="count">10</p>
								<p>分类</p>
							</span>
							<span class="menu-item">
								<p class="count">20</p>
								<p>标签</p>
							</span>
						</div>
						<div class="social-wrap">
							<a class="social-item" target="_blank" href="https://github.com/pjx1211">
								<i class="iconfont icon-github"></i>
								github
							</a>
						</div>
					</div>
				</transition>
			</div>
		</div>
		<div class="toggle" @mouseover="setLineData" @mouseout="setLineData" @click="toggle">
			<span
				v-for="(line,index) in toggleLineData"
				:key="index"
				:style="{width:line.width,top:line.top,transform:line.transform,opacity:line.opacity}"
				class="toggle-line"
			></span>
		</div>
	</div>
</template>

<script>
import ArticleMenu from '@/components/articleMenu/ArticleMenu'
export default {
	name: 'right-nav',
	data() {
		return {
			showRightNav: false,
			showMenu: false,  //显示文章目录
			// toggle图标里的横线样式
			lineStyle: {
				normalLineData: [
					{
						width: '100%',
						top: '0px',
						transform: 'rotateZ(0deg)',
						opacity: '1'
					},
					{
						width: '100%',
						top: '0px',
						transform: 'rotateZ(0deg)',
						opacity: '1'
					},
					{
						width: '100%',
						top: '0px',
						transform: 'rotateZ(0deg)',
						opacity: '1'
					}
				],
				closeLineData: [
					{
						width: '100%',
						top: '6px',
						transform: 'rotateZ(-45deg)',
						opacity: '1'
					},
					{
						width: '100%',
						top: '0px',
						transform: 'rotateZ(0deg)',
						opacity: '0'
					},
					{
						width: '100%',
						top: '-6px',
						transform: 'rotateZ(45deg)',
						opacity: '1'
					}
				],
				arrowLineData: [
					{
						width: '50%',
						top: '3px',
						transform: 'rotateZ(-45deg)',
						opacity: '1'
					},
					{
						width: '100%',
						top: '0px',
						transform: 'rotateZ(0deg)',
						opacity: '1'
					},
					{
						width: '50%',
						top: '-3px',
						transform: 'rotateZ(45deg)',
						opacity: '1'
					}
				]
			},
			//过渡的样式
			toggleLineData: []
		}
	},
	created() {
		this.toggleLineData = this.showRightNav
			? this.lineStyle.closeLineData
			: this.lineStyle.normalLineData
	},
	methods: {
		toggle() {
			//当点击时变成关闭
			this.showRightNav = !this.showRightNav
			this.toggleLineData = this.lineStyle.closeLineData
		},
		setLineData(e) {
			if (this.showRightNav) return
			// 鼠标一上去换成一个箭头形状
			if (e.type == 'mouseover') {
				this.toggleLineData = this.lineStyle.arrowLineData
			} else if (e.type == 'mouseout') {
				//鼠标移除的时候变回正常
				this.toggleLineData = this.lineStyle.normalLineData
			}
		}
	},
	components: {
		ArticleMenu
	}
}
</script>

<style lang='stylus' scoped>
.right-nav
	position: relative
	width: 320px
	transition: all 0.5s
	padding: 90px 0 100px 0
	background-color: #f5f5f5
	color: #555
	box-shadow: 0 0 5px rgba(202, 203, 203, 0.5)

	.right-nav-wrap
		width: 320px
		z-index: 1000
		padding-top: 80px
		overflow: hidden
		height: 100%
		background-color: #fff
		// transition: all 0.3s
		display: flex
		flex-direction: column
		align-items: center

		.menu-head
			margin-bottom: 30px

			> span
				color: #999
				padding: 5px
				font-weight: bold
				cursor: pointer
				line-height: 2
				&:hover
					color #262a30
				&.active
					color: #262a30
					border-bottom 1px solid #262a30

		.content-wrap
			width: 100%
			overflow: hidden
			max-height: calc(100vh - 150px)
			flex: 1
			position: relative

			.article-menu
				position: absolute
				left: 0
				top: 0
				width: 100%
				height 100%
				padding: 5px

			.info-wrap
				width: 100%
				display: flex
				flex-direction: column
				align-items: center
				position: absolute
				left: 0
				top: 0

				.avatar
					border: 4px solid #fff
					width: 100px
					height: 100px
					border-radius: 50%

				.name
					padding: 15px
					font-size: 18px
					font-weight: bold

				.motto
					color: #999
					padding: 5px 15px
					font-size: 14px
					font-weight: bold
					text-align: center

				.menu-wrap
					margin-top: 15px
					display: flex
					align-items: center

					.menu-item
						display: flex
						flex-direction: column
						align-items: center
						border-right: 1px solid #555
						font-size: 13px
						padding: 0 15px
						color: #999
						cursor pointer
						transition: all 0.3s

						&:last-child
							border-right: none

						&:hover
							color: #262a30

						.count
							margin-bottom: 5px
							font-size: 18px
							font-weight: 600

				.social-wrap
					padding: 20px
					display: flex
					align-items: center
					justify-content: space-between
					flex-wrap: wrap

					.social-item
						padding: 5px
						border: 1px solid #fc6423
						color: #fc6423
						transition: all 0.3s
						cursor: pointer
						border-radius: 5px

						&:hover
							background-color: #fc6423
							color: #fff

						.iconfont
							font-size: 14px

	.toggle
		position: fixed
		width: 24px
		height: 24px
		background-color: #262a30
		right: 40px
		bottom: 45px
		padding: 5px
		z-index: 1001
		cursor: pointer
		line-height: 0

		.toggle-line
			position: relative
			display: inline-block
			vertical-align: top
			width: 100%
			height: 2px
			margin-top: 4px
			background-color: #fff
			transition: all 0.3s

			&:first-child
				margin-top: 0

.slide-fade-enter-active,.slide-fade-leave-active
	transition: all 0.3s ease

.slide-fade-enter, .slide-fade-leave-to
	opacity: 0
	transform: translateY(30px)
</style>
