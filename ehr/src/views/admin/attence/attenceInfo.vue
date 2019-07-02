//考勤情况
<template>
	<div class="attenceInfo">
		<p>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>考勤管理</el-breadcrumb-item>
				<el-breadcrumb-item>考勤情况</el-breadcrumb-item>
			</el-breadcrumb>
		</p>
		<div class="search">
			<div>
				员工姓名：
				<el-input size="mini" v-model="searchName" placeholder="请输入员工姓名"></el-input>
			</div>
			<div>
				员工工号：
				<el-input size="mini" v-model="searchId" placeholder="请输入员工工号"></el-input>
			</div>
			<div>
				打卡时间：
				<el-date-picker
					size="mini"
					v-model="searchTime"
					type="datetime"
					placeholder="选择日期时间"
					default-time="12:00:00"
				></el-date-picker>
			</div>
			<div>
				处理状态：
				<el-select v-model="searchState" size="mini" placeholder="请选择">
					<el-option v-for="item in state" :key="item" :label="item" :value="item"></el-option>
				</el-select>
			</div>
			<div>
				<el-button size="mini" type="primary" @click="search">查询</el-button>
				<el-button size="mini" @click="reset">重置</el-button>
			</div>
		</div>
		<div class="btns">
			<el-button type="success" size="mini" icon="el-icon-refresh-right" @click="refresh">刷新</el-button>
			<el-button type="success" size="mini" icon="el-icon-download" @click="excel">导出</el-button>
			<el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(null,null,deleteDatas)">删除</el-button>
		</div>
		<div class="article-table-wrap">
			<div class="table" v-loading="loading">
				<el-table :data="tableData" border stripe style="width: 100%" size="mini">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="clockInTime" label="打卡时间" show-overflow-tooltip align="center">
						<template slot-scope="scope">{{scope.row.clockInTime | dateformat('YYYY-MM-DD HH:MM:SS')}}</template>
					</el-table-column>
					<el-table-column prop="clockInIocation" label="打卡位置" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column prop="tag" label="标记" align="center"></el-table-column>
					<el-table-column prop="empName" label="对应员工" align="center"></el-table-column>

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
		<el-dialog title="修改" :visible.sync="dialogFormVisible">
			<el-form size="mini" :model="editForm">
				<el-form-item label="打卡时间" label-width="150px">
					<el-date-picker
						size="mini"
						v-model="updateDatas.clockInTime"
                        :placeholder="editForm.clockInTime|dateformat('YY-MM-DD HH:MM:SS')"
						type="datetime"
						default-time="12:00:00"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="打卡位置" label-width="150px">
					<el-input
						v-model="updateDatas.clockInIocation"
						:placeholder="editForm.clockInIocation"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="标记" label-width="150px">
					<el-input v-model="updateDatas.tag" :placeholder="editForm.tag" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="对应员工" label-width="150px">
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
	name: 'attenceInfo',
	data() {
		return {
			loading: false,
			dialogFormVisible: false, //显示对话框
			state: [], //处理状态
			searchName: '',
			searchId: '',
			searchTime: '',
			searchState: '',

			currentPage: 1, //当前页面
			pageSize: 11, //每页显示9条数据
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
		getAllAttendance() {
			this.$axios.get('/attendance/queryAttendance').then(res => {
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
				this.state = this.unique(this.allDatas, 'clockInIocation')
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
			this.getAllAttendance()
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
						.post('/attendance/deleteAttendance', { ids: ids })
						.then(res => {
							if (res.data.success) {
								// 删除成功
								this.$toast('删除成功', 'success')
								this.getAllAttendance()
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
			this.updateDatas.clockInTime = this.$moment(
				this.updateDatas.clockInTime
			).format('YYYY-MM-DD')
			this.dialogFormVisible = false
			if (this.updateDatas.id) {
				//修改数据
				this.$axios
					.post('/attendance/updateAttendance', this.updateDatas)
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
					.post('/attendance/addAttendance', this.updateDatas)
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
			let emp_id = this.searchId.trim()
			let empName = this.searchName.trim()
			var arr = []
			if (emp_id != '') arr.push({ key: 'emp_id', value: emp_id })
			if (empName != '') arr.push({ key: 'empName', value: empName })
			if (this.searchTime != '' && this.searchTime != null)
				arr.push({ key: 'clockInTime', value: this.searchTime })
			if (this.searchState != '')
				arr.push({ key: 'clockInIocation', value: this.searchState })
			if (arr.length == 0) {
				return
			} else if (arr.length == 1) {
				this.searchDatas = this.allDatas.filter(item => {
					return item[arr[0].key] == arr[0].value
				})
			} else {
				this.searchDatas = this.allDatas.filter(item => {
					return item[arr[0].key] == arr[0].value
				})
				for (var i = 1; i < arr.length; i++) {
					this.searchDatas = this.searchDatas.filter(item => {
						return item[arr[i].key] == arr[i].value
					})
				}
			}
			this.currentPage = 1
			this.total = this.searchDatas.length
			this.tableData = this.searchDatas.slice(
				(this.currentPage - 1) * this.pageSize,
				this.currentPage * this.pageSize
			)
		},
		//点击重置按钮
		reset() {
			if (
				this.searchName == '' &&
				this.searchId == '' &&
				this.searchTime == '' &&
				this.searchState == ''
			)
				return
			this.searchId = ''
			this.searchName = ''
			this.searchTime = ''
			this.searchState = ''
			this.searchDatas = []
			this.getAllAttendance()
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
					item.clockInTime = this.$moment(item.clockInTime).format(
						'YYYY-MM-DD HH:MM:SS'
					)
				})
				this.$exportExcel(
					this.deleteDatas,
					['打卡时间', '打卡位置', '标记', '对应员工'],
					['clockInTime', 'clockInIocation', 'tag', 'empName']
				)
			}
		}
	},
	created() {
		this.getAllAttendance()
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
.attenceInfo
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
