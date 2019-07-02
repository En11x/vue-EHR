//离职员工管理
<template>
	<div class="employeeDimission">
		<p>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>
					职员档案
				</el-breadcrumb-item>
				<el-breadcrumb-item>离职员工管理</el-breadcrumb-item>
			</el-breadcrumb>
		</p>
		<div class="search">
			离职表：
		</div>
		<div class="btns">
			<el-button type="primary" size="mini" icon="el-icon-plus" @click="dialogFormVisible=true">添加</el-button>
			<el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(null,null,deleteDatas)">删除</el-button>
			<el-button type="success" size="mini" icon="el-icon-refresh-right" @click='refresh'>刷新</el-button>
			<el-button type="success" size="mini" icon="el-icon-download" @click='excel'>导出</el-button>
		</div>
		<div class="article-table-wrap">
			<div class="table" v-loading='loading'>
				<el-table :data="tableData" border stripe style="width: 100%" size="mini" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" label="编号" show-overflow-tooltip align="center">
						
					</el-table-column>
					<el-table-column prop="instructions" label="离职说明" align="center" show-overflow-tooltip>
					
					</el-table-column>
					<el-table-column label="离职时间" align="center">
						<template slot-scope="scope">{{ $moment(scope.row.departureTime).format('YYYY-MM-DD') }}</template>
					</el-table-column>
                    <el-table-column prop="empName" label="离职员工" align="center">
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
				<div class="pagination" v-if="tableData.length">
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


        <el-dialog :title="editForm.id?'修改':'增加'" :visible.sync="dialogFormVisible">
			<el-form size="mini" :model="editForm">
				<el-form-item v-if='editForm.id' label="编号" label-width="120px">
					<el-input
						v-model="updateDatas.id"
						style="border:none"
						:placeholder="editForm.id"
						autocomplete="off"
                        disabled
					></el-input>
				</el-form-item>
				<el-form-item label="离职说明" label-width="120px">
					<el-input v-model="updateDatas.instructions" :placeholder="editForm.instructions" autocomplete="off"></el-input>
				</el-form-item>
		
				<el-form-item label="离职时间" label-width="120px">
					<el-date-picker
						v-model="updateDatas.departureTime"
						type="date"
						:placeholder="editForm.departureTime|dateformat('YYYY-MM-DD')"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="对应员工" label-width="120px">
					<el-input
						:disabled="editForm.id?'disabled':false"
						v-model="updateDatas.empName"
						:placeholder="editForm.empName"
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
	name: 'employeeDimission',
	data() {
		return {
			loading: false,
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
		getAllDeparture() {
			this.$axios.get('/departure/queryDeparture').then(res => {
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
			this.getAllDeparture()
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
						.post('/departure/deleteDeparture', { ids: ids })
						.then(res => {
							if (res.data.success) {
								// 删除成功
								this.$toast('删除成功', 'success')
								this.getAllDeparture()
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
			this.updateDatas.departureTime = this.$moment(
				this.updateDatas.departureTime
			).format('YYYY-MM-DD')
			
			this.dialogFormVisible = false
			if (this.updateDatas.id) {
				//修改数据
				this.$axios
					.post('/departure/updateDeparture', this.updateDatas)
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
					.post('/departure/addDeparture', this.updateDatas)
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
		this.getAllDeparture()
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
.employeeDimission
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
