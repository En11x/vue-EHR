//分类标签
<template>
	<div class="category-tag">
		<p>分类/标签</p>
		<div class="category-tag-wrap">
			<div class="table-wrap">
				<div class="action-btn-wrap">
					<span>新增分类</span>
				</div>
				<div class="table">
					<el-table :data="tableData" border stripe style="width: 100%" size="mini">
						<el-table-column label="分类名称" show-overflow-tooltip min-width='70'>
							<template slot-scope="scope">
								<div class="title">
									<span>文章标题文章标题文章标题文章标题文章标题文章标题文章标题</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="文章数" align="center" prop="articleCount">
							<template slot-scope="scope">java</template>
						</el-table-column>

						<el-table-column prop="createTime" label="创建时间">2018-6-45 11:25:00</el-table-column>
						<el-table-column prop="createTime" label="发布时间">2018-6-45 11:25:00</el-table-column>
						<el-table-column label="状态">
							<template slot-scope="scope">
								<el-tag :type="true ? 'primary' : 'success'" size="mini" disable-transitions>已使用</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="操作" min-width='190' align="center">
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
				</div>
			</div>
			<div class="table-wrap">
				<div class="action-btn-wrap">
					<span>新增分类</span>
				</div>
				<div class="table">
					<el-table :data="tableData" border stripe style="width: 100%" size="mini">
						<el-table-column label="分类名称" show-overflow-tooltip min-width='70'>
							<template slot-scope="scope">
								<div class="title">
									<span>文章标题文章标题文章标题文章标题文章标题文章标题文章标题</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="文章数" align="center" prop="articleCount">
							<template slot-scope="scope">java</template>
						</el-table-column>

						<el-table-column prop="createTime" label="创建时间">2018-6-45 11:25:00</el-table-column>
						<el-table-column prop="createTime" label="发布时间">2018-6-45 11:25:00</el-table-column>
						<el-table-column label="状态">
							<template slot-scope="scope">
								<el-tag :type="true ? 'primary' : 'success'" size="mini" disable-transitions>已使用</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="操作" min-width='190' align="center">
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
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'categoryTag',
	data() {
		return {
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				},
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				
			]
		}
	},
	components: {}
}
</script>

<style lang='stylus' scoped>
.category-tag
	padding: 0 20px
	background-color: #fff
	height: 100%
	display flex
	flex-direction column

	> p
		padding: 10px
		width: 100%
		font-size: 16px
		font-weight: bold
		border-bottom: 1px solid rgba(38, 42, 48, 0.1)

	.category-tag-wrap
		animation: show 0.8s
		display: flex
		position: relative
		width: 100%
		flex 1

	.table-wrap
		margin: 5px
		transition: all 0.3s
		padding-bottom: 10px
		position relative
		width 100%
		overflow-y auto

		.table
			position: absolute
			width 100%

		.action-btn-wrap
			padding: 5px

			> span
				display: inline-block
				padding: 8px 10px
				font-size: 14px
				cursor: pointer
				background-color: #409eff
				color: white
				border-radius: 8px

				&:hover
					background-color: lighten(#409eff, 10%)

.title
	cursor: pointer

	&:hover
		color: #29b6f6
</style>
