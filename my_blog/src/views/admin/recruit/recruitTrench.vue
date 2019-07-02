//发布渠道应聘者
<template>
	<div class="recruitTrench">
		<p>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>招聘管理</el-breadcrumb-item>
				<el-breadcrumb-item>发布渠道应聘者</el-breadcrumb-item>
			</el-breadcrumb>
		</p>

		<div class="btns">
			<el-button type="primary" size="mini" icon="el-icon-plus"@click="dialogFormVisible=true">添加</el-button>
			<el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(null,null,deleteDatas)">删除</el-button>
			<el-button type="success" size="mini" icon="el-icon-refresh-right" @click="refresh">刷新</el-button>
			<el-button type="success" size="mini" icon="el-icon-download">导出</el-button>
		</div>
		<div class="article-table-wrap">
			<div class="table" v-loading='loading'>
				<el-table :data="tableData" border stripe style="width: 100%" size="mini" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="name" label="渠道名称或地址" show-overflow-tooltip align="center">
						
					</el-table-column>
					<el-table-column label="渠道上传时间" align="center" show-overflow-tooltip>
						<template slot-scope="scope">
                            {{scope.row.addTime|dateformat('YYYY-MM-DD')}}
                        </template>
					</el-table-column>
					<el-table-column prop="mark" label="备注" align="center" show-overflow-tooltip>
	
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<div class="pagination" v-if='allDatas.length'>
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
		<el-dialog title="添加" :visible.sync="dialogFormVisible">
			<el-form size="mini" :model="editForm">
				<el-form-item prop="name" label="渠道名称或地址" label-width="120px">
					<el-input v-model="editForm.name" :placeholder="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="渠道上传时间" label-width="120px">
					<el-date-picker
						v-model="updateDatas.addTime"
						type="date"
						:placeholder="editForm.addTime|dateformat('YYYY-MM-DD')"
					></el-date-picker>
				</el-form-item>
                <el-form-item label="备注" label-width="120px">
					<el-input v-model="editForm.mark" :placeholder="editForm.mark" autocomplete="off"></el-input>
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
	name: 'recruitTrench',
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
		getAllChannel() {
			this.$axios.get('/channel/queryChannel').then(res => {
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
			this.getAllChannel()
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
						.post('/channel/deleteChannel', { ids: ids })
						.then(res => {
							if (res.data.success) {
								// 删除成功
								this.$toast('删除成功', 'success')
								this.getAllChannel()
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
			this.updateDatas.addTime = this.$moment(
				this.updateDatas.addTime
            ).format('YYYY-MM-DD')
            if(this.allDatas.find(item=>item.name==this.updateDatas.name)){
                return this.$toast('渠道名已经存在','warning')
            }
			this.dialogFormVisible = false
			if (this.updateDatas.id) {
				//修改数据
				this.$axios
					.post('/channel/updateChannel', this.updateDatas)
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
					.post('/channel/addChannel', this.updateDatas)
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
		}
	},
	created() {
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
.recruitTrench
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
