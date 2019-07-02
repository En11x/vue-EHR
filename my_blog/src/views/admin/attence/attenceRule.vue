//考勤规则
<template>
	<div class="attenceRule">
		<p>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>考勤管理</el-breadcrumb-item>
				<el-breadcrumb-item>考勤规则</el-breadcrumb-item>
			</el-breadcrumb>
		</p>
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
					<el-table-column prop="rulesName" label="规则名称" show-overflow-tooltip align="center"></el-table-column>
					<el-table-column prop="clockInNum" label="打卡次数" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column prop="amStartTime" label="上午上班打卡时间" align="center"></el-table-column>
					<el-table-column prop="amEndTime" label="上午下班打卡时间" align="center"></el-table-column>
					<el-table-column prop="pmStartTime" label="下午上班打卡时间" align="center"></el-table-column>
					<el-table-column prop="pmEndTime" label="下午下班打卡时间" align="center"></el-table-column>
					<el-table-column prop="clockInIocation" label="打卡位置" align="center"></el-table-column>
					<el-table-column prop="instructions" label="备注" align="center"></el-table-column>
					<el-table-column prop="empName" label="规则发布人" align="center"></el-table-column>

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
				<el-form-item label="规则名称" label-width="150px">
					<el-input v-model="updateDatas.rulesName" :placeholder="editForm.rulesName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="打卡次数" label-width="150px">
					<el-input-number v-model="editForm.clockInNum" controls-position="right" :min="1" :max="10"></el-input-number>
				</el-form-item>
				<el-form-item label="上午上班打卡时间" label-width="150px">
					<el-time-select
						v-model="updateDatas.amStartTime"
						:picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
						:placeholder="editForm.amStartTime"
					></el-time-select>
				</el-form-item>
				<el-form-item label="上午下班打卡时间" label-width="150px">
                    <el-time-select
						v-model="updateDatas.amEndTime"
						:picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
						:placeholder="editForm.amEndTime"
					></el-time-select>
				</el-form-item>
				<el-form-item label="下午上班打卡时间" label-width="150px">
					<el-time-select
						v-model="updateDatas.pmStartTime"
						:picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
						:placeholder="editForm.pmStartTime"
					></el-time-select>
				</el-form-item>
				<el-form-item label="下午下班打卡时间" label-width="150px">
                    <el-time-select
						v-model="updateDatas.pmEndTime"
						:picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
						:placeholder="editForm.pmEndTime"
					></el-time-select>
				</el-form-item>
				<el-form-item label="打卡位置" label-width="150px">
					<el-input
						v-model="updateDatas.clockInIocation"
						:placeholder="editForm.clockInIocation"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="备注" label-width="150px">
					<el-input
						v-model="updateDatas.instructions"
						:placeholder="editForm.instructions"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="规则发布人" label-width="150px">
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
	name: 'attenceRule',
	data() {
		return {
			loading: false,
			dialogFormVisible: false, //显示对话框

			currentPage: 1, //当前页面
			pageSize: 5, //每页显示9条数据
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
		getAllRule() {
			this.$axios.get('/rule/queryRule').then(res => {
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
			this.getAllRule()
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
						.post('/rule/deleteRule', { ids: ids })
						.then(res => {
							if (res.data.success) {
								// 删除成功
								this.$toast('删除成功', 'success')
								this.getAllRule()
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
			// this.updateDatas.initateTime = this.$moment(
			// 	this.updateDatas.initateTime
			// ).format('YYYY-MM-DD')
			console.log(typeof(this.updateDatas.amEndTime))
			this.dialogFormVisible = false
			if (this.updateDatas.id) {
				//修改数据
				this.$axios
					.post('/rule/updateRule', this.updateDatas)
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
					.post('/rule/addRule', this.updateDatas)
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
			let RuleAddress = this.searchAddress.trim()
			let empName = this.searchName.trim()
			if (RuleAddress === '' && empName === '') return
			if (RuleAddress !== '' && empName === '') {
				//按名称查找
				this.searchDatas = this.allDatas.filter(data =>
					data.RuleAddress.includes(RuleAddress)
				)
				this.currentPage = 1
				this.total = this.searchDatas.length
				this.tableData = this.searchDatas.slice(
					(this.currentPage - 1) * this.pageSize,
					this.currentPage * this.pageSize
				)
			} else if (empName !== '' && RuleAddress === '') {
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
			} else if (RuleAddress !== '' && empName !== '') {
				this.searchDatas = this.allDatas.filter(data =>
					data.RuleAddress.toLowerCase().includes(
						RuleAddress.toLowerCase()
					)
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
			this.getAllRule()
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
						'RuleAddress',
						'introduce',
						'RuleTheDetail',
						'initateTime',
						'spending',
						'state',
						'empName'
					]
				)
			}
		}
		// getAllEmp() {
		// 	this.$axios.get('/emp/queryEmp').then(res => {
		// 		this.empNames =

		// 	})
		// },
	},
	created() {
		this.getAllRule()
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
.attenceRule
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
