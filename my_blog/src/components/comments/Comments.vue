//评论组件
<template>
	<div class="comments">
		<div class="wrap">
			<div class="header">
				<input name="nick" placeholder="昵称" type="text">
				<input name="mail" placeholder="邮箱" type="email">
				<input name="link" placeholder="网址(http://)" type="text">
			</div>
			<div class="edit">
				<textarea v-model="content" id="editor" placeholder="加上昵称更好玩。ヾﾉ≧∀≦)o来啊，快活啊!"></textarea>
				<div class="emoji">
					<span class="emoji-btn" :class="{'active':showEmojis}" @click="showEmojis=!showEmojis">表情</span>
				</div>
				<transition name="fade">
					<ul class="emojis" v-if="showEmojis">
						<li
							v-for="(emoji, index) in emojiList"
							:key="index"
							class="emoji-item"
							:title="emoji.title"
							@click="choseEmoji(emoji.title)"
						>
							<img :src="require('@/assets/static/emoji/'+emoji.name)" alt="表情">
						</li>
					</ul>
				</transition>
			</div>
			<div class="reply">
				<div class="reply-btn">
					<button>回复</button>
				</div>
			</div>
		</div>
		<div class="comments-count">
			<span class="num">15</span> 评论
		</div>
		<div class="comments-wrap">
			<div class="comments-item">
				<div class="comments-info">
					<img class="avatar" :src="require('@/assets/images/user.jpg')" alt="用户头像">
					<div class="name-time">
						<p class="name">
							aasd
							<span>回复</span>
						</p>
						<p class="time">2019-06-11 15:15</p>
					</div>
				</div>
				<p class="content">
					<span>neirong</span>
				</p>
				<div class="comments-children">
					<div class="comments-child">
						<div class="comments-info">
							<img class="avatar" :src="require('@/assets/images/user.jpg')" alt="用户头像">
							<div class="name-time">
								<p class="name">
									aasd
									<span>回复</span>
								</p>
								<p class="time">2019-06-11 15:15</p>
							</div>
						</div>
						<p class="content">
							<span>neirong</span>
						</p>
					</div>
					<div class="comments-child">
						<div class="comments-info">
							<img class="avatar" :src="require('@/assets/images/user.jpg')" alt="用户头像">
							<div class="name-time">
								<p class="name">
									aasd
									<span>回复</span>
								</p>
								<p class="time">2019-06-11 15:15</p>
							</div>
						</div>
						<p class="content">
							<span>neirong</span>
						</p>
					</div>
					<div class="comments-child">
						<div class="comments-info">
							<img class="avatar" :src="require('@/assets/images/user.jpg')" alt="用户头像">
							<div class="name-time">
								<p class="name">
									aasd
									<span>回复</span>
								</p>
								<p class="time">2019-06-11 15:15</p>
							</div>
						</div>
						<p class="content">
							<span>neirong</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import emoji from '@/mixins/emoji'
export default {
	name: 'Comments',
	mixins: [emoji],
	data() {
		return {
			//显示表情
			showEmojis: false,
			
			//评论的内容
			content:''
		}
	},
	methods: {
		choseEmoji(title){
			//显示emoji的title
			this.content += title
		}	
	},
	components: {}
}
</script>

<style lang='stylus' scoped>
.comments
	overflow: hidden
	margin: 60px 20px 0
	line-height: 2

.wrap
	border: 1px solid #f0f0f0
	position: relative
	padding: 10px
	border-radius: 4px
	margin-bottom: 10px
	overflow: hidden

	.header
		display: flex
		align-items: center
		justify-content: space-between

		input
			border: none
			resize: none
			outline: none
			padding: 10px 5px
			max-width: 100%
			line-height: 2
			font-size: 0.775rem
			width: 100%
			transition: all 0.3s
			border-bottom: 1px dashed #dedede

			&:focus
				border-bottom-color: #eb5055

	.edit
		position: relative
		padding-top: 10px

		textarea
			overflow: hidden
			width: 100%
			resize: none
			min-height: 8.75rem
			font-size: 0.875rem
			color #555
			background-color: transparent
			border: none
			outline: none

		.emoji
			font-size: 12px
			line-height: 2
			text-align: right

			span
				display: inline-block
				cursor: pointer
				padding: 0 5px
				&.active
					border 1px solid #eee
					border-bottom none
					border-radius 8px 8px 0 0

		.emojis
			padding 5px
			height 100%
			border 1px solid #eee
			display flex
			flex-wrap wrap
			border-radius 5px 0 5px 5px
			.emoji-item
				padding 5px
				cursor pointer
				border-radius 5px
				width 28px
				height 28px
				> img 
					width 100%
					height 100%

	.reply
		padding-top: 15px

		.reply-btn
			text-align: right

			button
				text-align: center
				color: #313131
				border: 1px solid #ededed
				border-radius: 0.3rem
				display: inline-block
				background: #ededed
				font-weight: 400
				cursor: pointer
				padding: 0.5rem 1.25rem
				transition: all 0.4s

				&:hover
					color: #3090e4
					border-color: #3090e4
					background-color: #fff

.comments-count
	padding: 5px

	.num
		font-size: 1.25rem
		font-weight: 600

.comments-item
	padding: 10px 5px
	transition: background-color 0.3s

	&:hover
		background-color: #eeeeee

	.comments-info
		display: flex
		margin-bottom: 5px

		.avatar
			width: 32px
			height: 32px
			margin-right: 5px
			border-radius: 50%

		.name-time
			flex: 1

			.name
				font-size: 14px
				color: #555
				margin-bottom: 2px

				> span
					font-size: 12px
					float: right
					cursor: pointer
					color: lighten(#262a30, 30%)

					&:hover
						color: #3090e4

			.time
				font-size: 12px
				color: #999

	.content
		padding-left: 40px
		font-size: 14px
		line-height: 16px

	.comments-children
		margin-left: 12px
		border-left: 2px solid #999
		margin-top: 5px

		.comments-child
			padding: 10px 5px
			padding-left: 17px
			transition: background-color 0.3s

			&:hover
				background-color: #ddd

.fade-enter-active,.fade-leave-active
	transition all 0.3s ease 

.fade-enter,.fade-leave-to
	opacity 0

</style>
