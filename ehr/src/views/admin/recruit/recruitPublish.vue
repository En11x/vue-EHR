//信息发布
<template>
	<div class="recruitPublish">
		<p>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>招聘管理</el-breadcrumb-item>
				<el-breadcrumb-item>信息发布</el-breadcrumb-item>
			</el-breadcrumb>
		</p>
		<div class="search">
			<div>
				技能需求：
				<el-input size="mini" v-model="searchSkill" placeholder="技能需求"></el-input>
			</div>
			<div>
				<el-button size="mini" type="primary" @click="search">查询</el-button>
				<el-button size="mini" @click="reset">重置</el-button>
			</div>
		</div>
		<div class="btns">
			<el-button type="primary" size="mini" icon="el-icon-plus" @click="dialogFormVisible=true">添加</el-button>
			<el-button
				type="danger"
				size="mini"
				icon="el-icon-delete"
				@click="handleDelete(null,null,deleteDatas)"
			>删除</el-button>
			<el-button type="success" size="mini" icon="el-icon-refresh-right" @click="refresh">刷新</el-button>
			<el-button type="success" size="mini" icon="el-icon-download" @click="excel">导出</el-button>
		</div>
		<div class="article-table-wrap">
			<div class="table" v-loading="loading">
				<el-table
					:data="tableData"
					border
					stripe
					style="width: 100%"
					size="mini"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="skillsRequired" label="技能需求" show-overflow-tooltip align="center"></el-table-column>
					<el-table-column prop="hiring" label="招聘人数" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column prop="wageBudget" label="薪资预算" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column label="发起时间" align="center" min-width="200">
						<template slot-scope="scope">{{scope.row.initiateTime | dateformat('YYYY-MM-DD HH:MM:SS')}}</template>
					</el-table-column>
					<el-table-column label="状态" align="center">
						<template slot-scope="scope">
							<el-tag
								:type="scope.row.state ? 'primary' : 'danger'"
								disable-transitions
							>{{scope.row.state ? '已处理' : '未处理'}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="mark" label="备注" align="center"></el-table-column>
					<el-table-column prop="empName" label="发布人" align="center"></el-table-column>
					<el-table-column prop="channelName" label="渠道" align="center"></el-table-column>
					<el-table-column label="逻辑删除" align="center">
						<template slot-scope="scope">{{scope.row.logicToDelete?'未删除':'已删除'}}</template>
					</el-table-column>

					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button
								size="mini"
								icon="el-icon-delete"
								type="danger"
								@click="handleDelete(scope.$index, scope.row)"
							>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<div class="pagination" v-if="allDatas.length">
					<el-pagination
						:page-size="pageSize"
						layout="prev, pager, next"
						:total="total"
						:current-page.sync="currentPage"
						@current-change="handleCurrentChange"
					></el-pagination>
				</div>
			</div>
		</div>

		<!-- 对话框 -->
		<el-dialog :title="editForm.id?'修改需求':'添加需求'" :visible.sync="dialogFormVisible">
			<el-form size="mini" :model="editForm">
				<el-form-item label="技能要求" label-width="120px">
					<el-input
						v-model="editForm.skillsRequired"
						:placeholder="editForm.skillsRequired"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="招聘人数" label-width="120px">
					<el-input v-model="editForm.hiring" :placeholder="editForm.hiring" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="薪资预算" label-width="120px">
					<el-input v-model="editForm.wageBudget" :placeholder="editForm.wageBudget" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="发起时间" label-width="120px">
					<el-date-picker
						v-model="updateDatas.initiateTime"
						type="date"
						:placeholder="editForm.initiateTime|dateformat('YYYY-MM-DD')"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="状态" label-width="120px">
					<el-radio v-model="editForm.state" label=1>
						<el-tag type="primary" disable-transitions>已处理</el-tag>
					</el-radio>
					<el-radio v-model="editForm.state" label=0>
						<el-tag type="suceess" disable-transitions>未处理</el-tag>
					</el-radio>
				</el-form-item>
				<el-form-item label="备注" label-width="120px">
					<el-input v-model="updateDatas.mark" :placeholder="editForm.mark" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="发布人" label-width="120px">
					<el-input v-model="updateDatas.empName" :placeholder="editForm.empName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="渠道" label-width="120px">
					<el-select v-model="updateDatas.channelName" size="mini" :placeholder="editForm.channelName">
						<el-option v-for="item in channelData" :key="item.id" :label="item.name" :value="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if='editForm.id' label="逻辑删除" label-width="120px">
					<el-radio v-model="editForm.logicToDele" label=0>是</el-radio>
					<el-radio v-model="editForm.logicToDele" label=1>否</el-radio>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="submit">提 交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'recruitPublish',
	data() {
		return {
			loading: false,
			dialogFormVisible: false, //显示对话框
			searchSkill: '',

			currentPage: 1, //当前页面
			pageSize: 10, //每页显示9条数据
			total: 0, //总数
			allDatas: [], //全部数据
			tableData: [], //表格显示的数据
			searchDatas: [], //查询到的数据
			deleteDatas: [], //批量删除
			editForm: {}, //编辑表单
			updateDatas: {},
			channelData: []
		}
	},
	methods: {
		getAllRelease() {
			this.$axios.get('/release/queryRelease').then(res => {
				this.allDatas = res.data
				if (
					this.allDatas.length <=
						(this.currentPage - 1) * this.pageSize &&
					this.currentPage != 1
				) {
					this.currentPage--
				}
				this.tableData = this.allDatas.slice(
					(this.currentPage - 1) * this.pageSize,
					this.pageSize * this.currentPage
				)
				this.total = this.allDatas.length
			})
		},
		//数组去重
		unique(arr, key) {
			let newArr = []
			arr.forEach(item => {
				newArr.push(item[key])
			})
			return [...new Set(newArr)]
		},
		//改变当前页
		handleCurrentChange() {
			//获取分页数据
			this.tableData = this.allDatas.slice(
				(this.currentPage - 1) * this.pageSize,
				this.currentPage * this.pageSize
			)
		},
		//刷新
		refresh() {
			this.loading = true
			this.getAllRelease()
			setTimeout(() => {
				this.loading = false
			}, 400)
		},

		//批量删除
		handleSelectionChange(val) {
			this.deleteDatas = val
		},
		//删除
		handleDelete(index, row, datas) {
			let ids = []
			if (datas && datas.length != 0) {
				datas.forEach(item => {
					ids.push(item.id)
				})
			}
			if (row) {
				ids.push(row.id)
			}
			if (ids.length == 0) {
				return this.$message({
					message: '至少选择一条数据',
					type: 'warning'
				})
			}
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$axios
						.post('/release/deleteRelease', { ids: ids })
						.then(res => {
							if (res.data.success) {
								// 删除成功
								this.$toast('删除成功', 'success')
								this.getAllRelease()
							} else {
								this.$toast('删除失败', 'error')
							}
						})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
		},
		//编辑
		handleEdit(index, row) {
			this.editForm = row
			this.dialogFormVisible = true
		},
		//提交修改后的数据
		submit() {
			for (var key in this.editForm) {
				if (!this.updateDatas.hasOwnProperty(key)) {
					this.updateDatas[key] = this.editForm[key]
				}
			}
			this.updateDatas.initiateTime = this.$moment(
				this.updateDatas.initiateTime
			).format('YYYY-MM-DD')
			this.dialogFormVisible = false
			this.updateDatas.channelId = this.channelData.find(item=>{
                return item.name == this.updateDatas.channelName
            }).id
            console.log(this.updateDatas)
			if (this.updateDatas.id) {
				//修改数据
				this.$axios
					.post('/release/updateRelease', this.updateDatas)
					.then(res => {
						if (res.data.success) {
							// 编辑成功
							this.$toast('修改成功', 'success')
							this.refresh()
						} else {
							this.$toast('修改失败', 'error')
						}
					})
			} else {
				//增加数据
				this.$axios
					.post('/release/addRelease', this.updateDatas)
					.then(res => {
						if (res.data.success) {
							// 添加成功
							this.$toast('添加成功', 'success')
							this.refresh()
						} else {
							this.$toast('添加失败', 'error')
						}
					})
			}
		},
		//点击查询按钮
		search() {
			let skillsRequired = this.searchSkill.trim()
			if (skillsRequired === '') return

			this.searchDatas = this.allDatas.filter(data =>
				data.skillsRequired
					.toLowerCase()
					.includes(skillsRequired.toLowerCase())
			)

			this.currentPage = 1
			this.total = this.searchDatas.length
			this.tableData = this.searchDatas.slice(
				(this.currentPage - 1) * this.pageSize,
				this.currentPage * this.pageSize
			)
		},
		//点击重置按钮
		reset() {
			if (this.searchSkill == '') return
			this.searchSkill = ''
			this.searchDatas = []
			this.getAllRelease()
		},
		//导出
		excel() {
			if (this.deleteDatas.length == 0) {
				this.$message({
					message: '至少选择一条数据',
					type: 'warning'
				})
			} else {
				this.deleteDatas.forEach(item => {
					item.initiateTime = this.$moment(item.initiateTime).format(
						'YYYY-MM-DD'
					)
					item.state = item.state = 1 ? '以处理' : '未处理'
				})
				this.$exportExcel(
					this.deleteDatas,
					[
						'技能要求',
						'招聘人数',
						'薪资预算',
						'发起时间',
						'状态',
						'备注',
						'发布人'
					],
					[
						'skillsRequired',
						'hiring',
						'wageBudget',
						'initiateTime',
						'state',
						'mark',
						'empName'
					]
				)
			}
		},

		getAllChannel() {
			this.$axios.get('/channel/queryChannel').then(res => {
				this.channelData = res.data
			})
		}
	},
	created() {
		this.getAllRelease()
		this.getAllChannel()
	},
	watch: {
		dialogFormVisible: function(
			newDialogFormVisible,
			oldDialogFormVisible
		) {
			if (!newDialogFormVisible) {
				this.editForm = {}
				this.updateDatas = {}
			}
		}
	},
	components: {}
}
</script>

<style lang='stylus' scoped>
.recruitPublish
	padding: 0 20px
	background-color: #fff
	width: 100%
	height: 100%

	> p
		width: 100%
		padding: 10px
		font-size: 16px
		font-weight: bold
		margin-bottom: 10px
		border-bottom: 1px solid rgba(38, 42, 48, 0.1)
</style>
