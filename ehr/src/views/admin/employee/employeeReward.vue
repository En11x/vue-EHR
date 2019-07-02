//员工奖惩管理
<template>
	<div class="employeeReward">
		<p>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>职员档案</el-breadcrumb-item>
				<el-breadcrumb-item>奖惩管理</el-breadcrumb-item>
			</el-breadcrumb>
		</p>
		<div class="search">
			<div>
				奖罚表：
				<el-select size="mini" v-model="searchSituation" placeholder="请选择一个说明">
					<el-option v-for="item in situations" :key="item" :label="item" :value="item"></el-option>
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
			<div class="table" v-loading='loading'>
				<el-table
					:data="tableData"
					border
					stripe
					style="width: 100%"
					size="mini"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" label="编号" show-overflow-tooltip align="center"></el-table-column>
					<el-table-column prop="situation" label="情况说明" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column prop="money" label="金额" align="center"></el-table-column>
					<el-table-column label="判断" align="center">
						<template slot-scope="scope">{{scope.row.jugde?'是':'否'}}</template>
					</el-table-column>
					<el-table-column prop="time" label="奖罚时间" align="center">
						<template slot-scope="scope">{{ $moment(scope.row.time).format('YYYY-MM-DD') }}</template>
					</el-table-column>
					<el-table-column prop="name" label="对应员工" align="center"></el-table-column>

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
		<el-dialog :title="editForm.id?'修改':'增加'" :visible.sync="dialogFormVisible">
			<el-form size="mini" :model="editForm">
				<el-form-item v-if='editForm.id' label="编号" label-width="120px">
					<el-input
						v-model="updateDatas.id"
						style="border:none"
						:placeholder="editForm.id"
						autocomplete="off"
						:disabled="editForm.id?'disabled':false"
					></el-input>
				</el-form-item>
				<el-form-item label="情况说明" label-width="120px">
					<el-input v-model="updateDatas.situation" :placeholder="editForm.situation" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="金额" label-width="120px">
					<el-input v-model="updateDatas.money" :placeholder="editForm.money" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="判断" label-width="120px">
					<el-input v-if='editForm.id' v-model="updateDatas.judge" :placeholder="editForm.judge" autocomplete="off"></el-input>
                    <div v-else><el-radio v-model="updateDatas.judge" label="1">是</el-radio>
                    <el-radio v-model="updateDatas.judge" label="0">否</el-radio></div>
				</el-form-item>
				<el-form-item label="奖罚时间" label-width="120px">
					<el-date-picker
						v-model="updateDatas.time"
						type="date"
						:placeholder="editForm.time|dateformat('YYYY-MM-DD')"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="对应员工" label-width="120px">
					<el-input
						:disabled="editForm.id?'disabled':false"
						v-model="updateDatas.name"
						:placeholder="editForm.name"
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
	name: 'employeeReward',
	data() {
		return {
			loading: false,
			situations: [],
			searchSituation: '',
			dialogFormVisible: false, //显示对话框
			currentPage: 1, //当前页面
			pageSize: 10, //每页显示9条数据
			total: 0, //总数
			allDatas: [], //全部数据
			tableData: [], //表格显示的数据
			searchDatas: [], //查询到的数据
			deleteDatas: [], //批量删除
			editForm: {}, //编辑表单的原数据
			updateDatas: {} //修改后的数据
		}
	},
	methods: {
		getAllReward() {
			
			this.$axios.get('/reward/queryReward').then(res => {
				this.allDatas = res.data
				
				if (
					this.allDatas.length <= this.pageSize &&
					this.currentPage != 1
				) {
					this.currentPage--
				}
				this.tableData = this.allDatas.slice(
					(this.currentPage - 1) * this.pageSize,
					this.pageSize * this.currentPage
				)
				this.total = this.allDatas.length
                this.situations = this.unique(this.allDatas, 'situation').filter(item=>item!==null)
                
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
			if (this.searchDatas.length > 0) {
				this.tableData = this.searchDatas.slice(
					(this.currentPage - 1) * this.pageSize,
					this.currentPage * this.pageSize
				)
			} else {
				this.tableData = this.allDatas.slice(
					(this.currentPage - 1) * this.pageSize,
					this.currentPage * this.pageSize
				)
			}
		},
		//刷新
		refresh() {
            this.loading = true
            this.getAllReward()
            setTimeout(() => {
                this.loading = false
            }, 400);
		},
		//点击查询按钮
		search() {
			let situation = this.searchSituation.trim()
			if (situation === '') return
			//按名称查找
			this.searchDatas = this.allDatas.filter(data =>
				data.situation.includes(situation)
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
			if (this.searchSituation == '') return
			this.searchSituation = ''
			this.searchDatas = []
			this.getAllReward()
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
						.post('/reward/deleteReward', { ids: ids })
						.then(res => {
							if (res.data.success) {
								// 删除成功
								this.$toast('删除成功', 'success')
								this.getAllReward()
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
			this.updateDatas.time = this.$moment(this.updateDatas.time).format(
				'YYYY-MM-DD'
            )
            console.log(this.updateDatas)
			this.dialogFormVisible = false
			if (this.updateDatas.id) {
				//修改数据
				this.$axios
					.post('/reward/updateReward', this.updateDatas)
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
					.post('/reward/addReward', this.updateDatas)
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
		this.getAllReward()
	},
	watch: {
		dialogFormVisible: function(
			newDialogFormVisible,
			oldDialogFormVisible
		) {
			if (!newDialogFormVisible) {
				this.updateDatas = {}
				this.editForm = {}
			}
		}
	},
	components: {}
}
</script>

<style lang='stylus' scoped>
.employeeReward
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
