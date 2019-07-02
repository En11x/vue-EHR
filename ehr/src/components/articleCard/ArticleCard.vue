//文章卡片组件
<template>
	<div id="article-card">
		<div class="article-card-wrap">
			<div class="article-title">
				<h1>
					<router-link class='title-link' to='/'>JavaScript数据结构与算法-Sort</router-link>
				</h1>
				<div class='article-info'>
					<span class='time'>
						<i class="iconfont icon-calendar"></i>
						<span>发表于</span>
						<span>2019-06-14</span>
					</span>
					<span class='category'>
						<span class='divider'>|</span>
						<i class="iconfont icon-folder"></i>
						<span>分类于</span>
						<span class='bottom-line'>
							<router-link to='/'>算法</router-link>	
						</span>
					</span>
					<span class='comments-count'>
						<span class='divider'>|</span>
						<i class="iconfont icon-comments"></i>
						<span class='bottom-line'>
							<router-link to='/'>0</router-link>	
						</span>
					</span>
				</div>
			</div>
			<div class="article-desc">
				以leetcode原题学习数据结构和算法
			</div>
			<div class="article-read">
				<router-link to='/'>阅读全文 »</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	components: {}
}
</script>

<style lang='stylus' scoped>
#article-card
	margin-top: 60px
	margin-bottom: 60px
	padding: 25px
	box-shadow: 0 0 5px rgba(202, 203, 203, 0.5)
	width: 700px
	margin: 0 auto
	margin-bottom 80px
	.article-title
		h1
			font-size 26px
			font-weight 400
			margin 20px 0 10px
		.title-link
			line-height 1.2
			display inline-block
			border-bottom none
			position relative
			&:before
				content ' '
				position absolute
				width 100%
				height 2px
				bottom 0
				left 0
				background-color #000
				visibility hidden
				transform scaleX(0)
				transition-duration .2s
				transition-timing-function ease-in-out
			&:hover
				color #222
				&:before
					transform scaleX(1)
					visibility visible
					height 1.8px

		.article-info
			margin-top 5px
			margin-bottom 20px
			font-size 12px;
			color #999
			.iconfont
				margin-right 3px
			.divider
				margin 0 0.5em
			.bottom-line
				border-bottom 1px solid #ccc
				&:hover
					color #222
					border-bottom-color #222
	.article-read
		margin-top 20px
		text-align left
		a
			padding 0
			font-size 14px
			border none
			display inline-block
			line-height 2
			position relative
			&:after
				content ''
				position absolute
				bottom 0
				left 0
				width 100%
				height 2px
				background-color #222
				transition all 0.2s ease-in-out
			&:hover
				&
					color #222
				&:after
					transform scaleX(0) 

</style>
