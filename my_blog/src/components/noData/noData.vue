//没有找到文章组件
<template>
	<div class="no-data">
		<img class="default-img" src="~ASSETS/images/nodatadefault.png" alt="找不到文章">
		<p v-if="text">{{text}}</p>
		<slot v-else></slot>
	</div>
</template>

<script>
export default {
	name: 'noData',
	props: {
		text: {
			type: String,
			default: ''
		}
	},
	data() {
		return {}
	},
	components: {}
}
</script>

<style lang='stylus' scoped>
    .no-data
        width 100%
        height 100%
        background-color #fff
        font-size 14px
        display flex
        min-height 450px
        flex-direction column
        align-items center
        justify-content center
        > p
            margin-top 20px
            color #a5a5a5
        .default-img
            width 240px
            height 190px
</style>
