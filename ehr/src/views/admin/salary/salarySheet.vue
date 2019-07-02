//工资条管理
<template>
	<div class="salarySheet">
		<p>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>薪资管理</el-breadcrumb-item>
				<el-breadcrumb-item>工资条</el-breadcrumb-item>
			</el-breadcrumb>
		</p>

		<div class="btns">
			<el-button type="success" size="mini" icon="el-icon-refresh-right" @click="refresh">刷新</el-button>
			<el-button type="success" size="mini" icon="el-icon-download" @click="excel">导出</el-button>
			<el-button
				type="danger"
				size="mini"
				icon="el-icon-delete"
				@click="handleDelete(null,null,deleteDatas)"
			>删除</el-button>
			<el-button type="primary" size="mini" icon="el-icon-upload">发送所有人工资条</el-button>
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
					<el-table-column prop="emp_id" label="编号" show-overflow-tooltip align="center"></el-table-column>
					<el-table-column prop="empName" label="对应员工" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column prop="shouldSend" label="应发工资" align="center"></el-table-column>
					<el-table-column prop="bonus" label="奖金" align="center"></el-table-column>
					<el-table-column prop="fine" label="罚款" align="center"></el-table-column>
					<el-table-column prop="insured" label="投保" align="center"></el-table-column>
					<el-table-column prop="time" label="发放时间" align="center" width="200">
						<template slot-scope="scope">{{ $moment(scope.row.time).format('YYYY-MM-DD HH:mm:ss') }}</template>
					</el-table-column>
					<el-table-column prop="realHair" label="实发工资" align="center"></el-table-column>

					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
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
	</div>
</template>

<script>
export default {
	name: 'salarySheet',
	data() {
		return {
			loading: false,
			dialogFormVisible: false, //显示对话框
			currentPage: 1, //当前页面
			pageSize: 12, //每页显示9条数据
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
		getAllWage() {
			this.loading = true
			this.$axios.get('/wage/queryWage').then(res => {
				this.allDatas = res.data
				this.loading = false
				if (
					this.allDatas.length <= (this.currentPage-1) * this.pageSize &&
					this.currentPage != 1
				){
					this.currentPage--}
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
			this.getAllWage()
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
						.post('/wage/deleteWage', { ids: ids })
						.then(res => {
							if (res.data.success) {
								// 删除成功
								this.$toast('删除成功', 'success')
								this.getAllWage()
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
			this.dialogFormVisible = false
			if (this.updateDatas.id) {
				//修改数据
				this.$axios
					.post('/wage/updateWage', this.updateDatas)
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
					.post('/wage/addWage', this.updateDatas)
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

		//导出
		excel() {
			if (this.deleteDatas.length == 0) {
				this.$message({
					message: '至少选择一条数据',
					type: 'warning'
				})
			} else {
				this.deleteDatas.forEach(item => {
					item.time = this.$moment(item.time).format('YYYY-MM-DD')
				})
				this.$exportExcel(
					this.deleteDatas,
					[
						'编号',
						'对应员工',
						'应发工资',
						'奖金',
						'罚款',
						'投保',
						'发放时间',
						'实发工资'
					],
					[
						'emp_id',
						'empName',
						'shouldSend',
						'bonus',
						'fine',
						'insured',
						'time',
						'realHair'
					]
				)
			}
		}
	},
	created() {
		this.getAllWage()
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
.salarySheet
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
