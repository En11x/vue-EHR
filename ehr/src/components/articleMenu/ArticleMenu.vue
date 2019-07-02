//博客文章目录
<template>
	<ul class="article-menu">
		<li>
			<span>1.前言</span>
		</li>
		<li>
			<span>2.冒泡排序</span>
		</li>
		<li>
			<span>3.选择排序</span>
			<ul class="article-menu">
				<li>
					<span>1.第一步</span>
				</li>
				<li>
					<span>2.第二步</span>
				</li>
				<li>
					<span>3.前言3</span>
				</li>
			</ul>
		</li>
		<li>
			<span>4.按奇偶排序数组</span>
		</li>
		<li>
			<span>5.缺失的第一个整数</span>
		</li>
		<li>
			<span>6.最后</span>
		</li>
	</ul>
</template>

<script>
import ArticleMenu from '@/components/articleMenu/ArticleMenu'
export default {
	name: 'ArticleMenu',
	data() {
		return {}
	},
	components: {
		ArticleMenu
	}
}
</script>

<style lang='stylus' scoped>
    .article-menu
        width 100%
        line-height 2
        font-size 14px
        color #999
        > li
            margin-left 20px
            > span 
                cursor pointer
                transition all 0.3s
                &.active,&:hover
                    color #262a30
</style>
