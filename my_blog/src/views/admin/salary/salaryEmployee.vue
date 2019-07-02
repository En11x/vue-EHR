//员工薪资管理
<template>
	<div class="salaryEmployee">
		<p>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>薪资管理</el-breadcrumb-item>
				<el-breadcrumb-item>员工薪资表</el-breadcrumb-item>
			</el-breadcrumb>
		</p>
		<div class="search">
			<div>
				用户名：
				<el-select size="mini" v-model="searchEmpName" placeholder="请输入用户名">
					<el-option v-for="item in empName" :key="item" :label="item" :value="item"></el-option>
				</el-select>
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
		<div class="article-table-wrap">
			<div class="table">
				<el-table
					:data="tableData"
					border
					stripe
					style="width: 100%"
					size="mini"
					v-loading="loading"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="name" label="员工" show-overflow-tooltip align="center"></el-table-column>
					<el-table-column prop="basicSalary" label="基本工资" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column prop="subsidies" label="补贴" align="center"></el-table-column>
					<el-table-column label="社保率" align="center">
						<template slot-scope="scope">{{scope.row.purchaseRate*10+'%'}}</template>
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
		<el-dialog :title="editForm.id?'修改薪资':'添加薪资'" :visible.sync="dialogFormVisible">
			<el-form size="mini" :model="editForm">
				<el-form-item label="员工" label-width="120px">
					<el-input v-model="editForm.name" :placeholder="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="基本工资" label-width="120px">
					<el-input
						v-model="editForm.basicSalary"
						:placeholder="editForm.basicSalary"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="补贴" label-width="120px">
					<el-input v-model="editForm.subsidies" :placeholder="editForm.subsidies" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="社保率" label-width="120px">
					<el-input
						v-model="editForm.purchaseRate"
						:placeholder="editForm.id?editForm.purchaseRate:'请输入1-9的数字'"
						autocomplete="off"
					></el-input>
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
	name: 'salaryEmployee',
	data() {
		return {
			loading: false,
			empName: [],
			searchEmpName: '', //搜索用户名
			dialogFormVisible: false, //显示对话框
			currentPage: 1, //当前页面
			pageSize: 10, //每页显示9条数据
			total: 0, //总数
			allDatas: [], //全部数据
			tableData: [], //表格显示的数据
			searchDatas: [], //查询到的数据
			deleteDatas: [], //批量删除
			editForm: {}, //编辑表单

			otherEmpDatas: [] //除显示的其他所有的empname
		}
	},
	methods: {
		getAllCompensation() {
			this.$axios.get('/compensation/queryCompensation').then(res => {
				this.allDatas = res.data
				if (
					this.allDatas.length <= (this.currentPage-1) * this.pageSize &&
					this.currentPage != 1
				){this.currentPage--}
				this.tableData = this.allDatas.slice(
					(this.currentPage - 1) * this.pageSize,
					this.pageSize * this.currentPage
				)
				this.total = this.allDatas.length
				this.empName = this.unique(this.allDatas, 'name')
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
			this.getAllCompensation()
			setTimeout(() => {
				this.loading = false
			}, 400)
		},
		//点击查询按钮
		search() {
			let name = this.searchEmpName.trim()
			if (name === '') return
			//按名称查找
			this.searchDatas = this.allDatas.filter(
				data => data.name.toLowerCase() == name.toLowerCase()
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
			if (this.searchEmpName == '') return
			this.searchEmpName = ''
			this.getAllCompensation()
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
						.post('/compensation/deleteCompensation', { ids: ids })
						.then(res => {
							if (res.data.success) {
								// 删除成功
								this.$toast('删除成功', 'success')
								this.getAllCompensation()
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
			this.dialogFormVisible = false
			if (this.editForm.id) {
				this.editForm.socialSecurityId = this.allDatas.find(item => {
					return item.purchaseRate == this.editForm.purchaseRate
				}).socialSecurityId
				this.editForm.emptId = this.allDatas.find(item => {
					return item.name == this.editForm.name
				}).empId
				//修改数据
				this.$axios
					.post('/compensation/updateCompensation', this.editForm)
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
                var addEmp = this.otherEmpDatas.find(item => {return item.name == this.editForm.name})
                if(!addEmp){
                    return this.$toast('员工已添加或该员工不存在', 'error')
                }
				this.editForm.empId = addEmp.id
				console.log(this.editForm)
				//增加数据
				this.$axios
					.post('/compensation/addCompensation', this.editForm)
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
		getAllEmp() {
			this.$axios.get('/emp/queryEmp').then(res => {
				this.otherEmpDatas = res.data.filter(item => {
					return this.empName.indexOf(item.name) < 0
				})
			})
		}
	},
	created() {
		this.getAllCompensation()
		this.getAllEmp()
	},
	watch: {
		dialogFormVisible: function(
			newDialogFormVisible,
			oldDialogFormVisible
		) {
			if (!newDialogFormVisible) this.editForm = {}
		}
	},
	components: {}
}
</script>

<style lang='stylus' scoped>
.salaryEmployee
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
