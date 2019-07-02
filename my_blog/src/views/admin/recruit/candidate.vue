//应聘者管理
<template>
	<div class="candidate">
		<p>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>招聘管理</el-breadcrumb-item>
				<el-breadcrumb-item>应聘者管理</el-breadcrumb-item>
			</el-breadcrumb>
		</p>
		<div class="search">
			<div>
				名字：
				<el-input size="mini" v-model="searchName" placeholder="请输入名字"></el-input>
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
			<el-button type="primary" size="mini" icon="el-icon-plus" @click="dialogFormVisible=true">添加</el-button>
			<el-button
				type="danger"
				size="mini"
				icon="el-icon-delete"
				@click="handleDelete(null,null,deleteDatas)"
			>删除</el-button>
			<el-button type="success" size="mini" icon="el-icon-refresh-right" @click="refresh">刷新</el-button>
			<el-button type="success" size="mini" icon="el-icon-download" @click="excel">导出</el-button>
			<el-button type="warning" size="mini" icon="el-icon-arrow-right">发送offer</el-button>
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
					<el-table-column prop="name" label="名字" show-overflow-tooltip align="center"></el-table-column>
					<el-table-column label="性别" align="center" show-overflow-tooltip>
						<template slot-scope="scope">
							<el-tag
								:type="scope.row.sex ? 'primary' : 'danger'"
								disable-transitions
							>{{scope.row.sex ? '男' : '女'}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="qq" label="qq" align="center" min-width="120" show-overflow-tooltip></el-table-column>
					<el-table-column prop="phone" label="电话" align="center"></el-table-column>
					<el-table-column prop="email" label="邮箱" align="center"></el-table-column>
					<el-table-column prop="age" label="年龄" align="center"></el-table-column>
					<el-table-column prop="currentAddress" label="现住址" align="center"></el-table-column>
					<el-table-column label="应聘时间" align="center">
						<template slot-scope="scope">{{scope.row.applicantTime|dateformat('YYYY-MM-DD')}}</template>
					</el-table-column>
					<el-table-column prop="specialty" label="技术" min-width="120" align="center"></el-table-column>
					<el-table-column prop="comments" label="评价" show-overflow-tooltip align="center" width="200"></el-table-column>
					<el-table-column prop="mark" label="备注" align="center"></el-table-column>

					<el-table-column label="操作" width="400">
						<template slot-scope="scope">
							<el-button size="mini" type="primary">发送offer</el-button>
							<el-button size="mini" :type="scope.row.offered?'primary':'info'" :disabled='!scope.row.offered' @click="handleAdd(scope.$index, scope.row)">{{scope.row.offered?'录取员工':'已录取'}}</el-button>
							<el-button
								size="mini"
								type="success"
								icon="el-icon-edit"
								@click="handleEdit(scope.$index, scope.row)"
							>编辑</el-button>
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
				<el-form-item label="名字" label-width="120px">
					<el-input v-model="editForm.name" :placeholder="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" label-width="120px">
					<el-radio v-model="editForm.sex" label="1">
						<el-tag type="primary" disable-transitions>女</el-tag>
					</el-radio>
					<el-radio v-model="editForm.sex" label="0">
						<el-tag type="suceess" disable-transitions>男</el-tag>
					</el-radio>
				</el-form-item>
				<el-form-item label="qq" label-width="120px">
					<el-input v-model="editForm.qq" :placeholder="editForm.qq" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" label-width="120px">
					<el-input v-model="editForm.phone" :placeholder="editForm.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" label-width="120px">
					<el-input v-model="editForm.email" :placeholder="editForm.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="年龄" label-width="120px">
					<el-input-number v-model="editForm.age" controls-position="right" :min="1" :max="100"></el-input-number>
				</el-form-item>
				<el-form-item label="现住址" label-width="120px">
					<el-input
						v-model="editForm.currentAddress"
						:placeholder="editForm.currentAddress"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="应聘时间" label-width="120px">
					<el-date-picker
						v-model="updateDatas.applicantTime"
						type="date"
						:placeholder="editForm.applicantTime|dateformat('YYYY-MM-DD')"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="技术" label-width="120px">
					<el-input v-model="editForm.specialty" :placeholder="editForm.specialty" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="评价" label-width="120px">
					<el-input v-model="editForm.comments" :placeholder="editForm.comments" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="备注" label-width="120px">
					<el-input v-model="updateDatas.mark" :placeholder="editForm.mark" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="submit">提 交</el-button>
			</div>
		</el-dialog>

        <!-- 录取员工 -->
        <!-- 对话框 -->
		<el-dialog title="录取员工" :visible.sync="addFormVisible">
			<el-form size="mini" :model="editForm" >
				
				<el-form-item label="名字" label-width="120px">
					<el-input v-model="addForm.name" disabled :placeholder="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" label-width="100px" required>
					<div>
                        <span style='margin-left:20px'><i style='margin-right:10px;font-size:16px;font-weight:bold' :style="addForm.sex?'color:blue':'color:pink'" :class="addForm.sex?'el-icon-male':'el-icon-female'"></i>{{addForm.sex?'男':'女'}}</span>
                    </div>
				</el-form-item>
				<el-form-item label="所属部门" label-width="120px" required>
					<el-select size="mini" v-model="deptName" placeholder="部门名称">
						<el-option v-for="item in deptDatas.names" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="职位" label-width="120px" required>
					<el-select size="mini" v-model="addForm.positionName" placeholder="职位名称">
						<el-option v-for="item in positionNames" :key="item.name" :label="item.name" :value="item.name"></el-option>
					</el-select>
				</el-form-item>
                <el-form-item label="所属公司" label-width="120px">
					<el-select size="mini" v-model="addForm.companyName" placeholder="选择公司" required>
						<el-option v-for="item in companyData.names" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="addFormVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click='submitAdd'>提 交</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
export default {
	name: 'candidate',
	data() {
		return {
			loading: false,
            dialogFormVisible: false, //显示对话框
            addFormVisible:false, //录取员工
			sex: ['男', '女'],
			searchName: '',
			searchSex: '',

			currentPage: 1, //当前页面
			pageSize: 5, //每页显示9条数据
			total: 0, //总数
			allDatas: [], //全部数据
			tableData: [], //表格显示的数据
			searchDatas: [], //查询到的数据
			deleteDatas: [], //批量删除
			editForm: {}, //编辑表单
			updateDatas: {},
            channelData: [],
            
            deptName:'',
            positionNames:[],
            companyData:[],

            addForm:{},  //录取员工
            deptDatas:{},
            positionDatas:{}
		}
	},
	methods: {
		getAllApplicant() {
			this.$axios.get('/applicant/queryApplicant').then(res => {
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
			if (this.searchDatas.length) {
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
			this.getAllApplicant()
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
						.post('/applicant/deleteApplicant', { ids: ids })
						.then(res => {
							if (res.data.success) {
								// 删除成功
								this.$toast('删除成功', 'success')
								this.getAllApplicant()
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
        
        //显示添加员工对话框
        handleAdd(index,row){
            this.addForm.name = row.name
            this.addForm.sex = row.sex
            this.addForm.id = row.id
            this.addFormVisible = true
        },
        //点击确认添加员工
        submitAdd(){
            this.addForm.sex = this.addForm.sex=='1'?'男':'女'
            // this.addForm.deptId = this.deptDatas.find(item=>item.name==this.addForm.deptName).id 
            // this.addForm.positionId = this.positionDatas.find(item=>item.name==this.addForm.positionName).id 

             if(this.deptName){
                 this.addForm.deptName = this.deptName
             }
            this.addForm.positionId = this.positionDatas.find(item=>item.name==this.addForm.positionName).id
            this.addForm.companyId = this.companyData.find(item=>item.name == this.addForm.companyName ).id
            this.addForm.deptId = this.deptDatas.find(item=>item.companyId == this.addForm.companyId&&item.name==this.addForm.deptName).id
            
            console.log(this.addForm)
            this.$axios.post('/emp/addEmp',this.addForm).then(res=>{
                if(res.data.success){
                    this.$axios.post('/applicant/updateOffered',{id:this.addForm.id,offered:0}).then(data=>{
                        if(data.data.success){
                            this.allDatas.find(item=>item.id==this.addForm.id).offered = 0
                            this.addFormVisible = false
                            this.$toast('录取成功','success')
                        }
                    })
                    
                }else{
                    this.$toast('录取失败','danger')
                }
            })
        },

		//编辑
		handleEdit(index, row) {
			this.editForm = row
			this.dialogFormVisible = true
		},
		//提交修改后的数据
		submit() {
            this.updateDatas = {}
			for (var key in this.editForm) {
				if (!this.updateDatas.hasOwnProperty(key)) {
					this.updateDatas[key] = this.editForm[key]
				}
			}
			this.updateDatas.applicantTime = this.$moment(
				this.updateDatas.applicantTime
			).format('YYYY-MM-DD')
			
			console.log(this.updateDatas)
			if (this.updateDatas.id) {
                //修改数据
                this.dialogFormVisible = false
				this.$axios
					.post('/applicant/updateApplicant', this.updateDatas)
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
                if(this.allDatas.find(item=>item.name==this.editForm.name)){
                    return this.$toast('姓名已存在','warning')
                }
                this.dialogFormVisible = false
				//增加数据
				this.$axios
					.post('/applicant/addApplicant', this.updateDatas)
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
		// search() {
		// 	let name = this.searchName.trim()
		// 	let sex = this.searchSex.trim() == '男' ? 1 : 0

        //     if (name === '' && sex === '') return
            
        //     if( typeof name == 'number'){
        //         this.$message.error('请输入名字，不是数字')
        //     }

		// 	if (name !== '' && sex === '') {
		// 		this.searchDatas = this.allDatas.filter(data =>
		// 			data.name.toLowerCase().includes(name.toLowerCase())
		// 		)
		// 	} else if (name === '' && sex !== '') {
		// 		this.searchDatas = this.allDatas.filter(
		// 			data => data.sex === sex
		// 		)

		// 		console.log(this.searchDatas)
		// 	} else {
		// 		this.searchDatas = this.allDatas.filter(data =>
		// 			data.name.includes(name)
		// 		)
		// 		this.searchDatas = this.searchDatas.filter(
		// 			data => data.sex === sex
		// 		)
		// 	}

		// 	this.currentPage = 1
		// 	this.total = this.searchDatas.length
		// 	this.tableData = this.searchDatas.slice(
		// 		(this.currentPage - 1) * this.pageSize,
		// 		this.currentPage * this.pageSize
		// 	)
        // },
        
        //点击查询按钮
		search() {
			let name = this.searchName.trim()
			let sex = this.searchSex.trim()
            if(this.searchSex.trim() == '男'){sex = 1}else if(this.searchSex.trim() == '女'){sex=0}
			if (name === '' && sex === '') return
            console.log(name,sex)
			if (name !== '' && sex === '') {
				this.searchDatas = this.allDatas.filter(data =>
					data.name.includes(name)
				)
			} else if (name === '' && sex !== '') {
				this.searchDatas = this.allDatas.filter(
					data => data.sex === sex
				)

				console.log(this.searchDatas)
			} else {
                console.log(name)
				this.searchDatas = this.allDatas.filter(data =>
					data.name.includes(name)
				)
				this.searchDatas = this.searchDatas.filter(
					data => data.sex === sex
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
			if (this.searchName == '' && this.searchSex == '') return
			this.searchName = ''
			this.searchSex = ''
			this.searchDatas = []
			this.getAllApplicant()
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
		},

		getAllChannel() {
			this.$axios.get('/channel/queryChannel').then(res => {
				this.channelData = res.data
			})
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
        this.getAllApplicant()
        this.getAllDept()
        this.getAllPosition()
        this.getAllCompany()
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
        },
        deptName:function(newDeptName,oldDeptName){
            this.positionNames =  this.positionDatas.filter(item=>item.deptName == newDeptName)
        },
	},
	components: {}
}
</script>

<style lang='stylus' scoped>
.candidate
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
