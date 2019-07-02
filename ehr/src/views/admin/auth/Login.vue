//后台登录页面
<template>
	<div class="login">
		<div class="homepage-hero-module">
			<div class="video-container">
				<div :style="fixStyle" class="filter"></div>
				<video :style="fixStyle" autoplay loop class="fillWidth">
					<source :src="require('@/assets/login/loginVedio.mp4')" type="video/mp4" />浏览器不支持 video 标签，建议升级浏览器。
					<!-- <source :src="PATH_TO_WEBM" type="video/webm">浏览器不支持 video 标签，建议升级浏览器。 -->
				</video>
				<!-- <div class="poster hidden" v-if="!vedioCanPlay">
					<img :style="fixStyle" :src="require('@/assets/login/loginImg.jpg')" alt>
				</div>-->

				<div class="login-content">
					<h1 class="title">EHR-人力资源管理系统</h1>
					<div class="login1 login_box" v-if="showLogin">
						<el-form
							:model="ruleForm"
							:rules="rules"
							ref="ruleForm"
							label-width="100px"
							class="demo-ruleForm"
						>
							<el-form-item label="用户名" prop="username">
								<input placeholder="请输入用户名" class="input" v-model="ruleForm.username" />
							</el-form-item>
							<el-form-item size="mini" label="密码" prop="password">
								<input type="password" placeholder="请输入密码" class="input" v-model="ruleForm.password" />
							</el-form-item>

							<el-form-item>
								<button @click="submitForm('ruleForm')">立即登录</button>
								<button @click="resetForm('ruleForm')">重置</button>
							</el-form-item>
						</el-form>
						<div class="toggleLogin">
							<span class="toggle" @click="showLogin=!showLogin">
								使用手机验证登录
								<i class="el-icon-right"></i>
							</span>
						</div>
					</div>
					<div class="login2 login_box" v-else>
						<div class="phone">
							<span>手机号</span>
							<input v-model="phone" placeholder="请输入手机号" />
						</div>

						<div class="yz">
							<input v-model="code" type="password" placeholder="请输入短信验证码" />
							<button @click="getCode" :disabled="disabled" class="getCode">{{content}}</button>
						</div>
						<div class='login-div'>
							<button class="login-btn" @click='phoneLogin'>登录</button>
						</div>
						<div class="toggleLogin">
							<span class="toggle" @click="showLogin=!showLogin">
								<i class="el-icon-back"></i>
								使用账号密码登录
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			vedioCanPlay: true,
			fixStyle: '',
			showLogin: true,

            phone: '',
            code:'',
			seconds: 60,
			disabled: false,
			content: '获取验证码',

			ruleForm: {
				username: '',
				password: ''
			},
			rules: {
				username: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'submit'
					},
					{
						min: 3,
						max: 14,
						message: '长度在 3 到 14 个字符',
						trigger: 'submit'
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'submit'
					},
					{
						min: 3,
						max: 14,
						message: '长度在 3 到 14 个字符',
						trigger: 'submit'
					}
				]
			}
		}
	},
	methods: {
		canplay() {
			this.vedioCanPlay = true
		},

		//获取验证码
		getCode() {
			var timer
			if (this.phone == '') {
				this.$message.error('输入电话号码！')
			} else {
				timer = setInterval(() => {
					this.content = this.seconds + 's后重新获取'
					this.disabled = true
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(timer)
						this.content = '获取验证码'
						this.seconds = 60
						this.disabled = false
					}
				}, 1000)

				this.$axios
					.post('/users/getCode', { phone: this.phone })
					.then(res => {
						console.log(res)
					})
			}
        },
        
        //手机登录
        phoneLogin(){
            let phone = this.phone.trim()
            let code = this.code.trim()
            if(phone!=''&&code!=''){
                //
                this.$axios.post('/users/checkCode',{phone,code}).then(res=>{
                    if(res.data.success){
                        localStorage.setItem('userInfo',JSON.stringify(res.data.data))
                        this.$router.push('/')
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            }
        },

		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$axios
						.post('/users/checkLogin', {
							username: this.ruleForm.username,
							password: this.ruleForm.password
						})
						.then(res => {
							if (res.data.success) {
								localStorage.setItem(
									'userInfo',
									JSON.stringify(res.data.data)
								)
								this.$router.push('/')
								
							} else {
								this.$message.error(res.data.message)
							}
						})
				}
			})
		},
		resetForm(formName) {
			this.ruleForm.username = ''
			this.ruleForm.password = ''
		}
	},
	mounted: function() {
		window.onresize = () => {
			const windowWidth = document.body.clientWidth
			const windowHeight = document.body.clientHeight
			const windowAspectRatio = windowHeight / windowWidth
			let videoWidth
			let videoHeight
			if (windowAspectRatio < 0.5625) {
				videoWidth = windowWidth
				videoHeight = videoWidth * 0.5625
				this.fixStyle = {
					height: windowWidth * 0.5625 + 'px',
					width: windowWidth + 'px',
					'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
					'margin-left': 'initial'
				}
			} else {
				videoHeight = windowHeight
				videoWidth = videoHeight / 0.5625
				this.fixStyle = {
					height: windowHeight + 'px',
					width: windowHeight / 0.5625 + 'px',
					'margin-left': (windowWidth - videoWidth) / 2 + 'px',
					'margin-bottom': 'initial'
				}
			}
		}
		window.onresize()
	}
}
</script>

   

<style scoped>
.login {
	position: fixed;
	top: 0px;
	left: 0;
	bottom: 0;
	right: 0px;
	z-index: 2000;
}
.login .login-content {
	position: absolute;
	width: 400px;
	height: 300px;
	top: 50%;
	left: 50%;
	margin-left: -150px;
	margin-top: -200px;
	border-radius: 10px;
	padding: 10px;
	z-index: 2001;
	background-color: rgba(255, 255, 255, 0.5);
}
.login .login-content .title {
	width: 100%;
	text-align: center;
	margin-bottom: 10px;
}
.login button {
	outline: none;
	background-color: transparent;
	border: none;
	color: rgb(85, 85, 85);
	cursor: pointer;
	border-bottom: 1px solid #222;
	border-bottom-width: 0px;
}
.login button:hover {
	border-bottom-width: 1px;
}
.login .login-content .login_box {
	width: 100%;
	padding: 20px 30px 0 0;
	position: absolute;
}
.login-div{
    width: 100%;
    text-align: center;
}
.login-div .login-btn {
	color: #f4f4f5;
	margin: 0 auto;
	font-size: 16px;
	padding: 0 10px;
	line-height: 30px;
	border: none;
	outline: none;
    border-radius: 10px;
    border:1px solid  #e9e9eb;
    transition: all 0.5s;
}
.login-div .login-btn:hover{
    color:#909399;
    background-color: #e9e9eb;
}
.login2 div {
	display: flex;
	align-items: center;
	height: 50px;
}
.login2 input,
.input {
	outline: none;
	border: none;
	line-height: 2;
	background-color: transparent;
}
/* .login2 input:focus{
    border: 1px solid #999;
} */
.phone span {
	display: inline-block;
	margin: 0 30px;
}
.yz {
	margin-left: 100px;
}
.yz .getCode {
	cursor: pointer;
	border-radius: 10px;
}
.login2 .toggleLogin {
	margin-top: 20px;
}
.toggleLogin {
	margin-top: 40px;
}
.yz .getCode {
	background-color: #f4f4f5;
	border-color: #e9e9eb;
	color: #909399;
	font-size: 12px;
	padding: 0 10px;
	line-height: 30px;
	border: none;
	outline: none;
}

.toggleLogin .toggle {
	float: right;
	font-size: 13px;
	border-bottom: 1px solid #222;
	cursor: pointer;
}

.homepage-hero-module,
.video-container {
	position: relative;
	height: 100vh;
	overflow: hidden;
}

.video-container .poster img,
.video-container video {
	z-index: 0;
	position: absolute;
}

.video-container .filter {
	z-index: 1;
	position: absolute;
	background: rgba(0, 0, 0, 0.4);
}
</style>
