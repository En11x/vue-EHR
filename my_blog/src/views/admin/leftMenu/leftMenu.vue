//左边菜单组件
<template>
	<div class="left-menu" :style="{width:collapseMenu?'64px':'240px'}">
		<div class="wrap">
			<div class="avatar">
				<el-popover placement="right" width="250" trigger="hover">
					<div style="margin:10px;whiteSpace:nowrap;overflow:hidden;text-overflow:ellipsis;">
						<span style="width:40px;">
							<i class="el-icon-edit"></i> ：
						</span>
						<span>{{userInfo.sign?userInfo.sign:'还没有签名哦~'}}</span>
					</div>
					<div style="margin:10px;">
						<span>
							<i class="el-icon-phone-outline"></i> ：
						</span>
						{{userInfo.phone?userInfo.phone:'无电话~'}}
					</div>
					<div style="margin:10px;">
						<span>
							<img src="~ASSETS/images/qq.png" alt="qq" /> ：
						</span>
						{{userInfo.QQ?userInfo.QQ:'没有qq~'}}
					</div>
					<div style="margin:10px;">
						<span>
							<i class="el-icon-location-outline"></i> ：
						</span>
						{{userInfo.currentAddress?userInfo.currentAddress:'住在哪儿~'}}
					</div>
					<div style="margin:10px;">
						<span>
							<i class="el-icon-chat-round"></i> ：
						</span>
						{{userInfo.specialty?userInfo.specialty:'没有评价~'}}
					</div>
					<img
						class="avatar_img"
						@click="editFormVisible=true"
						slot="reference"
						:src="userInfo.avatar?userInfo.avatar:require('ASSETS/avatar/default.png')"
						alt="作者头像"
					/>
				</el-popover>

				<span v-show="!collapseMenu" class="userName">
					{{userInfo.name}}
					<span style="margin-left:6px">
						<i
							style="font-size:13px;font-weight:bold"
							:style="userInfo.sex == '男'?'color:blue':'color:pink'"
							:class="userInfo.sex == '男'?'el-icon-male':'el-icon-female'"
						></i>
					</span>
					<div class="logout" @click="logout">
						退出
						<i class="el-icon-switch-button" style="fontSize:12px;fontWeight:bold;"></i>
					</div>
				</span>
			</div>
			<el-menu
				:default-active="defaultActive"
				router
				:collapse-transition="collapseMenu"
				:style="{paddingLeft:collapseMenu?'0':'20px'}"
				:collapse="collapseMenu"
				class="menu"
				:unique-opened="true"
			>
				<!-- 组织机构管理 -->
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>组织机构管理</span>
					</template>
					<el-menu-item index="/admin/company">
						<i class="el-icon-c-scale-to-original"></i>公司管理
					</el-menu-item>
					<el-menu-item index="/admin/department">
						<i class="el-icon-tickets"></i>部门管理
					</el-menu-item>
					<el-menu-item index="/admin/job">
						<i class="el-icon-user"></i>职位管理
					</el-menu-item>
				</el-submenu>

				<!-- 职员档案 -->
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-user-solid"></i>
						<span>职员档案</span>
					</template>
					<el-menu-item index="/admin/employee/info">
						<i class="el-icon-user"></i>员工信息管理
					</el-menu-item>
					<el-menu-item index="/admin/employee/reward">
						<i class="el-icon-collection-tag"></i>奖惩管理
					</el-menu-item>
					<el-menu-item index="/admin/employee/dimission">
						<i class="el-icon-document"></i>离职员工信息管理
					</el-menu-item>
				</el-submenu>

				<!-- 薪资管理 -->
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-s-finance"></i>
						<span>薪资管理</span>
					</template>
					<el-menu-item index="/admin/salary/employee">
						<i class="el-icon-pear"></i>员工薪资表
					</el-menu-item>
					<el-menu-item index="/admin/salary/grade">
						<i class="el-icon-orange"></i>薪资等级管理
					</el-menu-item>
					<el-menu-item index="/admin/salary/social">
						<i class="el-icon-coffee"></i>社保管理
					</el-menu-item>
					<el-menu-item index="/admin/salary/sheet">
						<i class="el-icon-ice-tea"></i>工资条管理
					</el-menu-item>
				</el-submenu>

				<!-- 考勤管理 -->
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-s-flag"></i>
						<span>考勤管理</span>
					</template>
					<el-menu-item index="/admin/attence/info">
						<i class="el-icon-time"></i>考勤情况
					</el-menu-item>
					<el-menu-item index="/admin/attence/rule">
						<i class="el-icon-chat-line-square"></i>考勤规则
					</el-menu-item>
				</el-submenu>

				<!-- 招聘管理 -->
				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-s-marketing"></i>
						<span>招聘管理</span>
					</template>
					<el-menu-item index="/admin/recruit/needs">
						<i class="el-icon-chat-round"></i>招聘需求
					</el-menu-item>
					<el-menu-item index="/admin/recruit/publish">
						<i class="el-icon-chat-line-round"></i>信息发布
					</el-menu-item>
					<el-menu-item index="/admin/recruit/trench">
						<i class="el-icon-wallet"></i>发布渠道应聘者
					</el-menu-item>
					<el-menu-item index="/admin/recruit/candidate">
						<i class="el-icon-bank-card"></i>应聘者管理
					</el-menu-item>
					<el-menu-item index="/admin/recruit/talent">
						<i class="el-icon-money"></i>人才储备管理
					</el-menu-item>
				</el-submenu>

				<!-- 团建管理 -->
				<el-submenu index="6">
					<template slot="title">
						<i class="el-icon-s-opportunity"></i>
						<span>团建管理</span>
					</template>
					<el-menu-item index="/admin/activity">
						<i class="el-icon-school"></i>团建活动
					</el-menu-item>
					<el-menu-item index="/admin/holiday">
						<i class="el-icon-notebook-2"></i>节日祝福
					</el-menu-item>
				</el-submenu>

				<!-- <el-menu-item index="/admin">
					<i class="iconfont icon-home"></i>
					<span slot="title">首页</span>
				</el-menu-item>
				<el-submenu index="2">
					<template slot="title">
						<i class="iconfont icon-article"></i>
						<span>文章管理</span>
					</template>
					<el-menu-item index="">
						<i class="iconfont icon-article-edit"></i>写文章
					</el-menu-item>
					<el-menu-item index="/admin/article/list">
						<i class="iconfont icon-article-manage"></i>文章列表
					</el-menu-item>
					<el-menu-item index="/admin/article/draft">
						<i class="iconfont icon-drafts"></i>草稿箱
					</el-menu-item>
					<el-menu-item index="/admin/article/deleted">
						<i class="iconfont icon-deleted"></i>回收站
					</el-menu-item>
				</el-submenu>
				<el-menu-item index="/admin/category">
					<i class="iconfont icon-tag"></i>
					<span slot="title">分类/标签</span>
				</el-menu-item>
				<el-menu-item index="/admin/comment">
					<i class="iconfont icon-comments"></i>
					<span slot="title">评论</span>
				</el-menu-item>
				<el-submenu index="4">
					<template slot="title">
						<i class="iconfont icon-config"></i>
						<span slot="title">网站配置</span>
					</template>
					<el-menu-item index="/admin/webConfig">
						<i class="iconfont icon-base-config"></i>基本配置
					</el-menu-item>
					<el-menu-item index="/admin/webConfig/about">
						<i class="iconfont icon-about"></i>关于我
					</el-menu-item>
					<el-menu-item index="/admin/webConfig/resume">
						<i class="iconfont icon-resume"></i>我的简历
					</el-menu-item>
					<el-menu-item index="/admin/webConfig/friends">
						<i class="iconfont icon-friends-link"></i>友链管理
					</el-menu-item>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title">
						<i class="iconfont icon-other"></i>
						<span slot="title">其他</span>
					</template>
					<el-menu-item :route="$route.path" index="0">
						<i class="iconfont icon-signout"></i>退出
					</el-menu-item>
				</el-submenu>-->
			</el-menu>
			<div
				class="collapse-wrap"
				@click="toggleCollapse"
				@mouseover="setLineData"
				@mouseout="setLineData"
			>
				<span
					class="collapse-line"
					v-for="(line,index) in toggleLineData"
					:key="index"
					:style="{width:line.width,top:line.top,transform:line.transform,opacity:line.opacity}"
				></span>
			</div>
		</div>

		<!-- 编辑个人信息 -->
		<el-dialog title="编辑个人信息" :visible.sync="editFormVisible">
			<div class="upload">
				<el-upload
					class="avatar-uploader"
					action="https://jsonplaceholder.typicode.com/posts/"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload"
					:on-preview="handlePictureCardPreview"
				>
					<img v-if="imageUrl" :src="imageUrl" class="avatar" />
					<img
						v-if="!imageUrl"
						:src="userInfo.avatar?userInfo.avatar:require('ASSETS/avatar/default.png')"
						class="avatar"
					/>
				</el-upload>
			</div>
			<div class="item">
				<span>我的签名：</span>
				<input v-model="editUserInfo.sign" :placeholder="userInfo.sign?userInfo.sign:''" />
			</div>

			<div class="item">
				<span>用户名：</span>
				<input v-model="editUserInfo.userid" :placeholder="userInfo.userid" />
			</div>
			<div class="item">
				<span>密码：</span>
				<input v-model="editUserInfo.password" :placeholder="userInfo.password" />
			</div>
			<div class="item">
				<span style="width:50px;margin-right:40px;whiteSpace:nowrap">生日：</span>
				<!-- <input v-model="editUserInfo.birthday" :placeholder="userInfo.birthday" /> -->
				<el-date-picker
					v-model="editUserInfo.birthday"
					type="date"
					size="mini"
					:placeholder="userInfo.birthday|dateformat('YYYY-MM-DD')"
				></el-date-picker>
			</div>
			<div class="item">
				<span>电话：</span>
				<input v-model="editUserInfo.phone" :placeholder="userInfo.phone" />
			</div>
			<div class="item">
				<span>qq：</span>
				<input type="text" v-model="editUserInfo.QQ" :placeholder="userInfo.QQ" />
			</div>
			<div class="item">
				<span>email：</span>
				<input type="text" v-model="editUserInfo.email" :placeholder="userInfo.email" />
			</div>
			<div class="item">
				<span>现居住地：</span>
				<input type="text" v-model="editUserInfo.currentAddress" :placeholder="userInfo.currentAddress" />
			</div>
			<div class="item">
				<span>备注：</span>
				<input type="text" v-model="editUserInfo.mark" :placeholder="userInfo.mark" />
			</div>

			<div class="item footer">
				<el-button size="mini" @click="editFormVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="submit">提 交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'leftMenu',
	data() {
		return {
			collapseMenu: false, //菜单栏合起来
			defaultActive: '',
			userInfo: {},
			editFormVisible: false,
			editUserInfo: {}, //编辑后的信息
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
				arrowLeftLineData: [
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
				],
				arrowRightLineData: [
					{
						width: '50%',
						top: '3px',
						transform: 'translateX(7px) rotateZ(45deg)',
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
						transform: 'translateX(7px) rotateZ(-45deg)',
						opacity: '1'
					}
				]
			},
			toggleLineData: [],

			imageUrl: '',

			gridData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}
			]
		}
	},
	//到达这个组件的时候

	created() {
		this.toggleLineData = this.lineStyle.normalLineData
		localStorage.getItem('userInfo')
			? (this.userInfo = JSON.parse(localStorage.getItem('userInfo')))
			: ''
	},

	watch: {
		//监听路由
		$route(to, from) {
			//从登录界面登录进来
			if (to.name == 'home' && from.name == 'login') {
				localStorage.getItem('userInfo')
					? (this.userInfo = JSON.parse(
							localStorage.getItem('userInfo')
					  ))
					: ''
			}
			if (to.name == 'home') {
				this.defaultActive = '1'
			}
		}
	},
	methods: {
		//退出登录
		logout() {
			this.$confirm('是否退出此系统？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.userInfo = {}
				localStorage.removeItem('userInfo')
				this.$router.push('/login')
			})
		},

		toggleCollapse() {
			this.collapseMenu = !this.collapseMenu
			this.collapseMenu
				? (this.toggleLineData = this.lineStyle.arrowRightLineData)
				: (this.toggleLineData = this.lineStyle.arrowLeftLineData)
		},
		setLineData(e) {
			if (e.type == 'mouseover') {
				this.toggleLineData = this.collapseMenu
					? this.lineStyle.arrowRightLineData
					: this.lineStyle.arrowLeftLineData
			} else {
				this.toggleLineData = this.lineStyle.normalLineData
			}
		},

		handleAvatarSuccess(res, file) {
			console.log(1)
			this.imageUrl = URL.createObjectURL(file.raw)
			var formData = new FormData()
			formData.append('img', file.raw)
			this.$axios.post('/upload/AddImg', formData).then(res => {
				if (res.data.success) {
					//上传成功
					this.userInfo.avatar = res.data.path
					this.imageUrl = res.data.path
				}
			})
		},
		handlePictureCardPreview(file) {
			this.ImageUrl = file.url
		},
		beforeAvatarUpload(file) {
			console.log(2)
			const isJPG = file.type === 'image/jpeg'
			const isLt2M = file.size / 1024 / 1024 < 2

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!')
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!')
			}
			return isJPG && isLt2M
		},

		//提交编辑过的表单
		submit() {
			for (var key in this.userInfo) {
				if (!this.editUserInfo.hasOwnProperty(key)) {
					this.editUserInfo[key] = this.userInfo[key]
				}
			}
			this.editUserInfo.birthday = this.$moment(
				this.editUserInfo.birthday
			).format('YYYY-MM-DD')
			console.log(this.editUserInfo)
			this.$axios.post('/emp/editEmp', this.editUserInfo).then(res => {
				if (res.data.success) {
					//更新成功
					this.$axios
						.post('/emp/queryEmpByUserId', {
							userid: this.editUserInfo.userid
						})
						.then(res => {
							if (res.data.length) {
								//更新userInfo
								this.userInfo = res.data[0]
								localStorage.removeItem('userInfo')
								localStorage.setItem(
									'userInfo',
									JSON.stringify(res.data[0])
								)
								this.editFormVisible = false
								this.$toast('修改成功', 'success')
							}
						})
				}
			})
		}
	},
	components: {}
}
</script>

<style lang="stylus" scoped>
.left-menu
	width: 64px
	height: 100%
	transition: all 0.5s
	position: relative

	.wrap
		width: 100%
		height: 100%

		.avatar
			width: 100%
			height: 80px
			background-color: hsla(0, 0%, 100%, 0.2)
			overflow: hidden
			position: relative
			padding-right: 50px

			img.avatar_img
				display: block
				width: 60px
				height: 60px
				border-radius: 60px
				margin: 10px auto
				cursor: pointer

			.userName
				color: #222
				font-size: 13px
				position: absolute
				right: 35px
				top: 30px
				display: flex
				align-items: center

		.menu
			height: 100%
			position: relative
			border: none
			transition: all 0.5s

			.el-submenu__title i, .el-menu-item i
				margin-right: 5px

			.el-menu-item.is-active
				border-right: 2px solid #409EFF
				color: #409EFF

		.collapse-wrap
			width: 24px
			height: 24px
			position: absolute
			right: 20px
			bottom: 20px
			padding: 5px
			z-index: 1050
			cursor: pointer
			line-height: 0

			.collapse-line
				display: inline-block
				width: 100%
				height: 2px
				margin-top: 4px
				transition: all 0.3s
				background-color: #909399
				position: relative

				&:first-child
					margin-top: 0

.upload
	width: 100%
	text-align: center

.upload .avatar
	width: 60px
	height: 60px
	display: block
	border-radius: 50%
	border: 1px solid #999

.item
	margin: 10px auto
	width: 250px
	display: flex
	align-items: center
	justify-content: space-between

	> input
		border: none
		outline: none
		padding: 5px
		border-bottom: 1px solid #222

.item.footer
	justify-content: flex-end
	margin-top: 20px

	.submit
		margin-left: 10px

.logout
	position: absolute
	top: 30px
	right: 0px
	font-size: 12px
	cursor: pointer
	transition: all 0.5s

.logout:hover
	transform: translateX(10px)
	color: #967899
</style>
