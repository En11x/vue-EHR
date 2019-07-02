//招聘需求
<template>
	<div class="attenceInfo">
		<p>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>招聘管理</el-breadcrumb-item>
				<el-breadcrumb-item>招聘需求</el-breadcrumb-item>
			</el-breadcrumb>
		</p>
		<div class="search">
			<div>
				处理状态：
				<el-select v-model="searchState" size="mini" placeholder="请选择">
					<el-option v-for="item in states" :key="item" :label="item" :value="item"></el-option>
				</el-select>
			</div>
			<div>
				需求人数：
				<el-input size="mini" v-model="searchNum" placeholder="人数"></el-input>
			</div>
			<div>
				<el-button size="mini" type="primary" @click='search'>查询</el-button>
				<el-button size="mini" @click='reset'>重置</el-button>
			</div>
		</div>
		<div class="btns">
			<el-button type="primary" size="mini" icon="el-icon-plus" @click="dialogFormVisible=true">添加</el-button>
			<el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(null,null,deleteDatas)">删除</el-button>
			<el-button type="success" size="mini" icon="el-icon-refresh-right" @click='refresh'>刷新</el-button>
			<el-button type="success" size="mini" icon="el-icon-download" @clicl='excel'>导出</el-button>
		</div>
		<div class="article-table-wrap">
			<div class="table" v-loading='loading'>
				<el-table :data="tableData" border stripe style="width: 100%" size="mini" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="skillsRequired" label="技能要求" show-overflow-tooltip align="center">
						
					</el-table-column>
					<el-table-column prop="hiring" label="招聘人数" align="center" show-overflow-tooltip>
						
					</el-table-column>
					<el-table-column prop="wageBudget" label="薪资预算" align="center" show-overflow-tooltip>
						
					</el-table-column>
					<el-table-column label="发起时间" align="center">
                        <template slot-scope="scope">
                            {{scope.row.initiateTime|dateformat('YYYY-MM-DD')}}
						</template>
					</el-table-column>
					<el-table-column label="状态" align="center">
						<template slot-scope="scope">
							<el-tag :type="scope.row.state == 1 ? 'primary' : 'success'" disable-transitions>{{scope.row.state == 1?'已处理':'未处理'}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="mark" label="备注" align="center">
					</el-table-column>
					<el-table-column prop="empName" label="发布人" align="center">
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
		<el-dialog :title="editForm.id?'修改需求':'添加需求'" :visible.sync="dialogFormVisible">
			<el-form size="mini" :model="editForm">
				<el-form-item label="技能要求" label-width="120px">
					<el-input v-model="editForm.skillsRequired" :placeholder="editForm.skillsRequired" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="招聘人数" label-width="120px">
					<el-input
						v-model="editForm.hiring"
						:placeholder="editForm.hiring"
						autocomplete="off"
					></el-input>
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
					<el-radio v-model="updateDatas.state" label='1'>
							<el-tag type="primary" disable-transitions >已处理</el-tag>
						</el-radio>
						<el-radio v-model="updateDatas.state" label='2'>
                            <el-tag type="suceess" disable-transitions>未处理</el-tag>
                    </el-radio>
				</el-form-item>
                <el-form-item label="备注" label-width="120px">
					<el-input v-model="editForm.mark" :placeholder="editForm.mark" autocomplete="off"></el-input>
				</el-form-item>
                <el-form-item label="发布人" label-width="120px">
					<el-input v-model="editForm.empName" :placeholder="editForm.empName" autocomplete="off"></el-input>
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
            states:['已处理','未处理'],  ///处理状态
            searchState:'',
            searchNum:'',

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
		getAllDemand() {
			this.$axios.get('/demand/queryDemand').then(res => {
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
			this.getAllDemand()
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
						.post('/demand/deleteDemand', { ids: ids })
						.then(res => {
							if (res.data.success) {
								// 删除成功
								this.$toast('删除成功', 'success')
								this.getAllDemand()
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
            console.log(this.updateDatas)
			if (this.updateDatas.id) {
				//修改数据
				this.$axios
					.post('/demand/updateDemand', this.updateDatas)
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
					.post('/demand/addDemand', this.updateDatas)
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
			let state = this.searchState.trim()=='已处理'?1:2
			let hiring = this.searchNum.trim()
			if (state === '' && hiring === '') return
			if (state !== '' && hiring === '') {
				//按名称查找
				this.searchDatas = this.allDatas.filter(data =>
					data.state ==state
				)
				
			} else if (hiring !== '' && state === '') {
				//按地址查找
				this.searchDatas = this.allDatas.filter(
					data => data.hiring == hiring
				)

			} else if (state !== '' && hiring !== '') {
				this.searchDatas = this.allDatas.filter(data =>
					data.state == state
					
				)
				this.searchDatas = this.searchDatas.filter(
					data => data.hiring == hiring
				)
				
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
			if (this.searchState == '' && this.searchNum == '') return
			this.searchState = ''
			this.searchNum = ''
			this.searchDatas = []
			this.getAllDemand()
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
                    item.state = item.state=1?'以处理':'未处理'
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
		this.getAllDemand()
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
