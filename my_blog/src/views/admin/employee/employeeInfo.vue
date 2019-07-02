//员工信息管理
<template>
	<div class="employeeInfo">
		<p>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>职员档案</el-breadcrumb-item>
				<el-breadcrumb-item>员工信息管理</el-breadcrumb-item>
			</el-breadcrumb>
		</p>
		<div class="search">
			<div>
				工号：
				<el-input size="mini" v-model="searchEmpId" placeholder="请输入工号"></el-input>
			</div>
			<div>
				姓名：
				<el-input size="mini" v-model="searchName" placeholder="请输入姓名"></el-input>
			</div>
			<div>
				性别：
				<el-select size="mini" v-model="searchSex" placeholder="请选择一个性别">
					<el-option v-for="item in sex" :key="item" :label="item" :value="item"></el-option>
				</el-select>
			</div>
			<div>
				<el-button size="mini" type="primary" @click="search">查询</el-button>
				<el-button size="mini" @click="reset">重置</el-button>
			</div>
		</div>
		<div class="btns">
			<el-button type="primary" size="mini" icon="el-icon-plus" @click="addEmp">添加</el-button>
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
					<el-table-column prop="id" label="工号" show-overflow-tooltip align="center"></el-table-column>
					<el-table-column prop="avatar" label="头像" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column prop="name" label="名字" align="center"></el-table-column>
					<el-table-column prop="password" label="密码" align="center"></el-table-column>
					<el-table-column prop="birthday" label="生日" align="center" min-width="100">
						<template
							slot-scope="scope"
						>{{ scope.row.birthday?$moment(scope.row.birthday).format('YYYY-MM-DD'):'' }}</template>
					</el-table-column>
					<el-table-column prop="sex" label="性别" align="center"></el-table-column>
					<el-table-column prop="positionName" label="职位" align="center"></el-table-column>
					<el-table-column prop="deptName" label="部门" align="center" min-width="100"></el-table-column>
					<el-table-column prop="companyName" label="公司" align="center" min-width="200"></el-table-column>
					<el-table-column prop="phone" label="电话" align="center" min-width="100"></el-table-column>
					<el-table-column prop="qq" label="qq" align="center" min-width="100"></el-table-column>
					<el-table-column prop="email" label="邮箱" align="center" min-width="100"></el-table-column>
					<el-table-column prop="age" label="年龄" align="center"></el-table-column>
					<el-table-column prop="currentAddress" label="现住址" align="center" min-width="100"></el-table-column>

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
		<el-dialog :title="editForm.id?'修改员工信息':'添加员工'" :visible.sync="dialogFormVisible">
			<el-form v-if="editForm.id" size="mini" :model="editForm">
				<el-form-item label="员工工号" label-width="120px">
					<el-input
						v-model="updateDatas.id"
						style="border:none"
						:placeholder="editForm.id"
						autocomplete="off"
                        disabled
					></el-input>
				</el-form-item>
				<el-form-item label="名字" label-width="120px">
					<el-input v-model="updateDatas.name" :placeholder="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" label-width="120px">
					<el-input v-model="updateDatas.password" :placeholder="editForm.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="生日" label-width="120px">
					<el-date-picker
						v-model="updateDatas.birthday"
						type="date"
						:placeholder="editForm.birthday |dateformat('YYYY-MM-DD')"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="性别" label-width="100px">
					<el-radio v-model="updateDatas.sex" label="1">男</el-radio>
					<el-radio v-model="updateDatas.sex" label="2">女</el-radio>
				</el-form-item>
                <el-form-item label="所属部门" label-width="120px">
					<el-select size="mini" v-model="deptName" :placeholder="editForm.deptName">
						<el-option v-for="item in deptDatas.names" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
                <el-form-item label="职位" label-width="120px">
					<el-select size="mini" v-model="updateDatas.positionName" :placeholder="editForm.positionName">
						<el-option v-for="item in positionNmaes" :key="item.name" :label="item.name" :value="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属公司" label-width="120px">
					<el-select size="mini" v-model="updateDatas.companyName" :placeholder="editForm.companyName">
						<el-option v-for="item in companyData.names" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="电话" label-width="120px">
					<el-input v-model="updateDatas.phone" :placeholder="editForm.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="qq" label-width="120px">
					<el-input v-model="updateDatas.qq" :placeholder="editForm.qq" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" label-width="120px">
					<el-input v-model="updateDatas.email" :placeholder="editForm.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="年龄" label-width="120px">
					<el-input v-model="updateDatas.age" :placeholder="editForm.age" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="现住址" label-width="120px">
					<el-input
						v-model="updateDatas.currentAddress"
						:placeholder="editForm.currentAddress"
						autocomplete="off"
					></el-input>
				</el-form-item>
			</el-form>

			<el-form v-else size="mini" :model="editForm">
				<el-form-item label="名字" label-width="120px">
					<el-input v-model="editForm.name" :placeholder="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" label-width="120px" required>
					<el-input v-model="editForm.password" :placeholder="editForm.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="生日" label-width="120px">
					<el-date-picker
						v-model="updateDatas.birthday"
						type="date"
						:placeholder="editForm.birthday |dateformat('YYYY-MM-DD')"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="性别" label-width="100px" required>
					<el-radio v-model="editForm.sex" label="1">男</el-radio>
					<el-radio v-model="editForm.sex" label="2">女</el-radio>
				</el-form-item>
				<el-form-item label="所属部门" label-width="120px" required>
					<el-select size="mini" v-model="deptName" placeholder="部门名称">
						<el-option v-for="item in deptDatas.names" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="职位" label-width="120px" required>
					<el-select size="mini" v-model="editForm.positionName" placeholder="职位名称">
						<el-option v-for="item in positionNmaes" :key="item.name" :label="item.name" :value="item.name"></el-option>
					</el-select>
				</el-form-item>
                <el-form-item label="所属公司" label-width="120px">
					<el-select size="mini" v-model="updateDatas.companyName" :placeholder="editForm.companyName">
						<el-option v-for="item in companyData.names" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="电话" label-width="120px">
					<el-input v-model="editForm.phone" :placeholder="editForm.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="qq" label-width="120px">
					<el-input v-model="editForm.qq" :placeholder="editForm.qq" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" label-width="120px">
					<el-input v-model="editForm.email" :placeholder="editForm.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="年龄" label-width="120px">
					<el-input v-model="editForm.age" :placeholder="editForm.age" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="现住址" label-width="120px">
					<el-input
						v-model="editForm.currentAddress"
						:placeholder="editForm.currentAddress"
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
	name: 'employeeInfo',
	data() {
		return {
			loading: false,
			sex: ['男', '女'],
			searchEmpId: '', //搜索工号
			searchSex: '', //搜索性别
			searchName: '',
			dialogFormVisible: false, //显示对话框
			currentPage: 1, //当前页面
			pageSize: 10, //每页显示9条数据
			total: 0, //总数
			allDatas: [], //全部数据
			tableData: [], //表格显示的数据
			searchDatas: [], //查询到的数据
			deleteDatas: [], //批量删除
			editForm: {}, //编辑表单
			updateDatas: {}, //需要更新的值
            nameSexData: {},
            
            deptName:'',  //部门名称
            deptNmaes:[],
            positionName:'',//职位名称
            positionNmaes:[],

			deptDatas: [], //部门数据
            positionDatas: [], //职位数据
            companyData:[] //公司数据
		}
	},
	methods: {
		getAllEmp() {
			this.loading = true
			this.$axios.get('/emp/queryEmp').then(res => {
                this.allDatas = res.data
                // this.allDatas.forEach(item=>item.deptId)
				this.loading = false
				if (
					this.allDatas.length <= this.pageSize - 1 &&
					this.currentPage != 1
				) {
					this.currentPage--
				}
				this.tableData = this.allDatas.slice(
					(this.currentPage - 1) * this.pageSize,
					this.pageSize * this.currentPage
				)
				this.total = this.allDatas.length
				this.EmpIds = this.unique(this.allDatas, 'id')
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
			this.getAllEmp()
        },
        addEmp(){
            this.dialogFormVisible = true
            this.editForm = {}
        },
		//点击查询按钮
		search() {
			let id = this.searchEmpId.trim()
			let sex = this.searchSex.trim()
			let name = this.searchName.trim()
			this.searchDatas = this.allDatas.filter(data =>
				data.name.includes(name)
			)
			if (sex !== null) {
				this.searchDatas = this.searchDatas.filter(data =>
					data.sex.includes(sex)
				)
			}
			this.nameSexData = this.searchDatas
			if (id != '') {
				this.searchDatas = this.searchDatas.filter(
					data => data.id == id
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
			if (this.searchEmpId == '' && this.searchSex == '') return
			this.searchEmpId = ''
			this.searchSex = ''
			this.searchName = ''
			this.searchDatas = []
			this.getAllEmp()
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
						.post('/Emp/deleteEmp', { ids: ids })
						.then(res => {
							if (res.data.success) {
								// 删除成功
								this.$toast('删除成功', 'success')
								this.getAllEmp()
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
            if(this.deptName){
                this.updateDatas.deptName = this.deptName
            }
            this.updateDatas.positionId = this.positionDatas.find(item=>item.name==this.updateDatas.positionName).id
            this.updateDatas.companyId = this.companyData.find(item=>item.name == this.updateDatas.companyName ).id
            this.updateDatas.deptId = this.deptDatas.find(item=>item.companyId == this.updateDatas.companyId&&item.name==this.updateDatas.deptName).id
            console.log(this.updateDatas)
			this.updateDatas.birthday = this.$moment(
				this.updateDatas.birthday
            ).format('YYYY-MM-DD')
            
			if (this.updateDatas.id) {
				//修改数据
				this.$axios
					.post('/Emp/updateEmp', this.updateDatas)
					.then(res => {
						if (res.data.success) {
							// 编辑成功
							this.$toast('修改成功', 'success')
							this.dialogFormVisible = false
							this.refresh()
						} else {
							this.$toast('修改失败', 'error')
						}
					})
			} else {
				//增加数据
				this.$axios.post('/Emp/addEmp', this.updateDatas).then(res => {
					if (res.data.success) {
						// 添加成功
                        this.$toast('添加成功', 'success')
                        this.dialogFormVisible = false
						this.refresh()
					} else {
						this.$toast('添加失败', 'error')
					}
				})
			}
		},
		getAllDept() {
			this.$axios.get('/dept/queryDept').then(res => {
				this.deptDatas = res.data
				this.deptDatas.names = this.unique(this.deptDatas, 'name')
			})
		},
		getAllPosition() {
			this.$axios.get('/position/queryPosition').then(res => {
				this.positionDatas = res.data
				this.positionDatas.names = this.unique(
					this.positionDatas,
					'name'
				)
			})
        },
        getAllCompany() {
			this.$axios.get('/company/queryCompany').then(res => {
                this.companyData = res.data
                // this.companyName = this.unique(this.allDatas, 'name')
                this.companyData.names = this.unique(
					this.companyData,
					'name'
				)
			})
		},
	},
	created() {
		this.getAllEmp()
		this.getAllDept()
        this.getAllPosition()
        this.getAllCompany()
	},
	watch: {
		dialogFormVisible: function(
			newDialogFormVisible,
			oldDialogFormVisible
		) {
			if (!newDialogFormVisible) this.updateDatas = {}
        },
        
        deptName:function(newDeptName,oldDeptName){
            console.log(newDeptName)
            this.positionNmaes =  this.positionDatas.filter(item=>item.deptName == newDeptName)
        },

		searchEmpId: function(newSearchEmpId, oldSearchEmpId) {
			if (this.searchSex == '' && this.searchName == '') {
				this.searchDatas = this.allDatas.filter(item =>
					item.id.toString().includes(newSearchEmpId)
				)

				this.currentPage = 1
				this.total = this.searchDatas.length
				this.tableData = this.searchDatas.slice(
					(this.currentPage - 1) * this.pageSize,
					this.currentPage * this.pageSize
				)
			} else {
				this.searchDatas = this.nameSexData.filter(item =>
					item.id.toString().includes(newSearchEmpId)
				)

				this.currentPage = 1
				this.total = this.searchDatas.length
				this.tableData = this.searchDatas.slice(
					(this.currentPage - 1) * this.pageSize,
					this.currentPage * this.pageSize
				)
			}
		}
	},
	components: {}
}
</script>

<style lang='stylus' scoped>
.employeeInfo
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

.el-input-mini .el-input__inner
	border: none
</style>
