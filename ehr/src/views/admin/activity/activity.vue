//团建活动
<template>
	<div class="activity">
		<p>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>团建管理</el-breadcrumb-item>
				<el-breadcrumb-item>团建活动</el-breadcrumb-item>
			</el-breadcrumb>
		</p>
		<div class="search">
			<div>
				活动地址：
				<el-input size="mini" v-model="searchAddress" placeholder="请输入要查询的地址"></el-input>
			</div>
			<div>
				组织人：
				<el-input size="mini" v-model="searchName" placeholder="输入名字"></el-input>
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
			<el-button type="success" size="mini" icon="el-icon-download">导出</el-button>
			<el-button type="info" size="mini" icon="el-icon-s-promotion">通知</el-button>
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
					<el-table-column prop="theme" label="主题" show-overflow-tooltip align="center"></el-table-column>
					<el-table-column prop="activityAddress" label="活动地址" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column prop="introduce" label="活动简介" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column prop="activityTheDetail" label="活动详情" align="center"></el-table-column>
					<el-table-column label="活动时间" align="center">
						<template slot-scope="scope">{{scope.row.initateTime | dateformat('YYYY-MM-DD')}}</template>
					</el-table-column>
					<el-table-column prop="spending" label="活动消费" align="center"></el-table-column>
					<el-table-column label="状态" align="center">
						<template slot-scope="scope">
							<el-tag
								:type=" scope.row.state ? 'primary' : 'success'"
								disable-transitions
							>{{scope.row.state?'通过':'未通过'}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="empName" label="组织人" align="center"></el-table-column>

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
				<div class="pagination">
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
		<el-dialog :title="editForm.id?'修改':'添加'" :visible.sync="dialogFormVisible">
			<el-form size="mini" :model="editForm">
				<el-form-item label="主题" label-width="120px">
					<el-input v-model="updateDatas.theme" :placeholder="editForm.theme" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="活动地址" label-width="120px">
					<el-input
						v-model="updateDatas.activityAddress"
						:placeholder="editForm.activityAddress"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="活动简介" label-width="120px">
					<el-input v-model="updateDatas.introduce" :placeholder="editForm.introduce" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="活动详情" label-width="120px">
					<el-input
						v-model="updateDatas.activityTheDetail"
						:placeholder="editForm.activityTheDetail"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="活动时间" label-width="120px">
					<el-date-picker
						v-model="updateDatas.initateTime"
						type="date"
						:placeholder="editForm.initateTime|dateformat('YYYY-MM-DD')"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="活动消费" label-width="120px">
					<el-input v-model="updateDatas.spending" :placeholder="editForm.spending" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态" label-width="120px">
					<el-input
						v-if="editForm.id"
						v-model="updateDatas.state"
						:placeholder="editForm.state"
						autocomplete="off"
					></el-input>
					<div v-else>
						<el-radio v-model="updateDatas.state" label="0">
							<el-tag type="primary" disable-transitions>未通过</el-tag>
						</el-radio>
						<el-radio v-model="updateDatas.state" label="1">
                            <el-tag type="suceess" disable-transitions>通过</el-tag>
                        </el-radio>
					</div>
				</el-form-item>
				<el-form-item label="组织人" label-width="120px">
					<el-input v-model="updateDatas.empName" :placeholder="editForm.empName" autocomplete="off"></el-input>
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
	name: 'activity',
	data() {
		return {
			loading: false,
			dialogFormVisible: false, //显示对话框
			searchAddress: '', //查询地址
			searchName: '', //查询name
			currentPage: 1, //当前页面
			pageSize: 8, //每页显示9条数据
			total: 0, //总数
			allDatas: [], //全部数据
			tableData: [], //表格显示的数据
			searchDatas: [], //查询到的数据
			deleteDatas: [], //批量删除
			editForm: {}, //编辑表单
			updateDatas: {},

			otherEmpDatas: [] //除显示的其他所有的empname
		}
	},
	methods: {
		getAllActivity() {
			this.$axios.get('/activity/queryActivity').then(res => {
				this.allDatas = res.data
				if (
					this.allDatas.length <=
						(this.currentPage - 1) * this.pageSize && 
					this.currentPage != 1
				){
					this.currentPage--}
				this.tableData = this.allDatas.slice(
					(this.currentPage - 1) * this.pageSize,
					this.pageSize * this.currentPage
				)
				this.total = this.allDatas.length
				this.address = this.unique(this.allDatas, 'activityAddress')
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
			this.getAllActivity()
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
						.post('/activity/deleteActivity', { ids: ids })
						.then(res => {
							if (res.data.success) {
								// 删除成功
								this.$toast('删除成功', 'success')
								this.getAllActivity()
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
			this.updateDatas.initateTime = this.$moment(this.updateDatas.initateTime).format(
				'YYYY-MM-DD'
            )
			this.dialogFormVisible = false
			if (this.updateDatas.id) {
				//修改数据
				this.$axios
					.post('/activity/updateActivity', this.updateDatas)
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
					.post('/activity/addActivity', this.updateDatas)
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
			let activityAddress = this.searchAddress.trim()
			let empName = this.searchName.trim()
			if (activityAddress === '' && empName === '') return
			if (activityAddress !== '' && empName === '') {
				//按名称查找
				this.searchDatas = this.allDatas.filter(data =>
					data.activityAddress.includes(activityAddress)
				)
				this.currentPage = 1
				this.total = this.searchDatas.length
				this.tableData = this.searchDatas.slice(
					(this.currentPage - 1) * this.pageSize,
					this.currentPage * this.pageSize
				)
			} else if (empName !== '' && activityAddress === '') {
				//按地址查找
				this.searchDatas = this.allDatas.filter(
					data => data.empName == empName
				)

				this.currentPage = 1
				this.total = this.searchDatas.length
				this.tableData = this.searchDatas.slice(
					(this.currentPage - 1) * this.pageSize,
					this.currentPage * this.pageSize
				)
			} else if (activityAddress !== '' && empName !== '') {
				this.searchDatas = this.allDatas.filter(data =>
					data.activityAddress
						.toLowerCase()
						.includes(activityAddress.toLowerCase())
				)
				this.searchDatas = this.searchDatas.filter(
					data => data.empName.toLowerCase() == empName.toLowerCase()
				)
				this.currentPage = 1
				this.total = this.searchDatas.length
				this.tableData = this.searchDatas.slice(
					(this.currentPage - 1) * this.pageSize,
					this.currentPage * this.pageSize
				)
			}
		},
		//点击重置按钮
		reset() {
			if (this.searchAddress == '' && this.searchName == '') return
			this.searchAddress = ''
			this.searchName = ''
			this.searchDatas = []
			this.getAllActivity()
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
					item.initateTime = this.$moment(item.initateTime).format(
						'YYYY-MM-DD'
					)
				})
				this.$exportExcel(
					this.deleteDatas,
					[
						'主题',
						'活动地址',
						'活动简介',
						'活动详情',
						'活动时间',
						'活动消费',
						'状态',
						'组织人'
					],
					[
						'theme',
						'activityAddress',
						'introduce',
						'activityTheDetail',
						'initateTime',
						'spending',
						'state',
						'empName'
					]
				)
			}
        },
        // getAllEmp() {
		// 	this.$axios.get('/emp/queryEmp').then(res => {
		// 		this.empNames =
				
		// 	})
		// },
	},
	created() {
        this.getAllActivity()
        // this.getAllEmp()
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
.activity
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

	.search
		width: 100%
		display: flex
		height: 40px
		align-items: center
		margin: 10px 0
		border-left: 2px solid #26b6f6
		padding-left: 10px
		font-size: 12px
		font-weight: bold

		> div
			display: flex
			align-items: center
			margin-right: 20px
			justify-content: space-between
			white-space: nowrap

	.btns
		margin: 10px 0

.article-table-wrap
	width: 100%
	animation: show 0.8s
	position: relative
	height: 100%

	.table
		width: 100%
		position: absolute

	.pagination
		position: absolute
		bottom: -40px
		right: 0

.article-title
	> span
		cursor: pointer

		&:hover
			color: #29b6f6
</style>
