//节日祝福
<template>
	<div class="holiday">
		<p>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>团建管理</el-breadcrumb-item>
				<el-breadcrumb-item>节日祝福</el-breadcrumb-item>
			</el-breadcrumb>
		</p>
		<div class="search">
			<div>
				节日名称：
				<el-input size="mini" v-model="searchName" placeholder="请输入节日名称"></el-input>
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
		</div>
		<div class="article-table-wrap" v-loading="loading">
			<div class="table">
				<el-table :data="tableData" border stripe style="width: 100%" size="mini">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="name" label="节日名称" show-overflow-tooltip align="center"></el-table-column>

					<el-table-column prop="time" label="日期" align="center">
						<template slot-scope="scope">{{scope.row.time | dateformat('YYYY-MM-DD')}}</template>
					</el-table-column>
					<el-table-column prop="content" label="祝福语" align="center"></el-table-column>

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
		<el-dialog :title="editForm.id?'修改':'添加'" :visible.sync="dialogFormVisible">
			<el-form size="mini" :model="editForm">
				<el-form-item label="节日名称" label-width="120px">
					<el-input v-model="updateDatas.name" :placeholder="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="日期" label-width="120px">
					<el-date-picker
						v-model="updateDatas.time"
						type="date"
						:placeholder="editForm.time|dateformat('YYYY-MM-DD')"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="祝福语" label-width="120px">
					<el-input v-model="updateDatas.content" :placeholder="editForm.content" autocomplete="off"></el-input>
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
	name: 'holiday',
	data() {
		return {
			loading: false,
			searchName: '', //搜索用户名
			dialogFormVisible: false, //显示对话框
			currentPage: 1, //当前页面
			pageSize: 10, //每页显示9条数据
			total: 0, //总数
			allDatas: [], //全部数据
			tableData: [], //表格显示的数据
			searchDatas: [], //查询到的数据
			deleteDatas: [], //批量删除
			editForm: {}, //编辑表单
			updateDatas: {}
		}
	},
	methods: {
		getAllHoliday() {
			this.$axios.get('/holiday/queryHoliday').then(res => {
				this.allDatas = res.data
				if (this.allDatas.length <=(this.currentPage - 1) * this.pageSize &&this.currentPage != 1) {
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
			this.getAllHoliday()
			setTimeout(() => {
				this.loading = false
			}, 400)
		},
		//点击查询按钮
		search() {
			let name = this.searchName.trim()
			if (name === '') return
			//按名称查找
			this.searchDatas = this.allDatas.filter(data =>
				data.name.toLowerCase().includes(name.toLowerCase())
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
			if (this.searchName == '') return
			this.searchName = ''
			this.getAllHoliday()
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
						.post('/holiday/deleteHoliday', { ids: ids })
						.then(res => {
							if (res.data.success) {
								// 删除成功
								this.$toast('删除成功', 'success')
								this.getAllHoliday()
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
			this.updateDatas.time = this.$moment(
				this.updateDatas.initateTime
			).format('YYYY-MM-DD')
			this.dialogFormVisible = false
			if (this.updateDatas.id) {
				//修改数据
				this.$axios
					.post('/holiday/updateHoliday', this.updateDatas)
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
					.post('/holiday/addHoliday', this.updateDatas)
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
		}
	},
	created() {
		this.getAllHoliday()
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
.holiday
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
