<template>
  <div>
    <my-bread></my-bread>
    <el-row class="addRole">
      <el-col>
        <el-button type="info">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 2. 表格 -->
    <el-table
      class="rolesTable"
      :data="roleslist"
      stripe
      style="width: 100%"
      highlight-current-row
    >
      <!-- 2.1 展开行 -->
      <el-table-column type="expand" label="#" width="150">
        <template slot-scope="scope">
          <el-row v-for="(item1, i) in scope.row.children" :key="i">
            <el-col :span="4">
              <span v-if="scope.row.children.length === 0">该角色无权限</span>
              <el-tag
                @close="deleRight(scope.row.id, item1.id)"
                type="success"
                closable
                >{{ item1.authName }}</el-tag
              >
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2, i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag
                    @close="deleRight(scope.row.id, item2.id)"
                    type="info"
                    closable
                    >{{ item2.authName }}</el-tag
                  >
                </el-col>
                <el-col :span="20">
                  <el-row>
                    <el-col>
                      <el-tag
                        @close="deleRight(scope.row.id, item3.id)"
                        :span="4"
                        v-for="(item3, i) in item2.children"
                        :key="i"
                        type="warning"
                        closable
                        >{{ item3.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="150"> </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="300">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="small"
            plain
            @click="showeEditUserDia(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="small"
            plain
            @click="showsetRoleRights(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            plain
            @click="showDeleteMsgBox(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 操作权限的对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="setRoleRightsDialogVisible"
      width="30%"
      center
    >
      <!-- 树形对话框-权限选择 -->
      <el-tree
        :data="treelist"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrcheck"
        :props="defaultProps"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleRightsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRightsDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'roleS',
  data () {
    return {
      arrcheck: [],
      treelist: [],
      roleslist: [],
      setRoleRightsDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  created () {
    this.getRoleslist()
  },
  methods: {
    // 显示操作角色权限对话框 请求树形对话框权限数据
    async showsetRoleRights (role) {
      const res = await this.$http.get('rights/tree')
      console.log(res)
      this.treelist = res.data.data
      // 获取当前角色role 的权限id
      const arrtemp1 = []
      role.children.forEach(item1 => {
        // arrtemp1.push(item1.id)
        item1.children.forEach(item2 => {
          // arrtemp1.push(item2.id)
          item2.children.forEach(item3 => {
            arrtemp1.push(item3.id)
          })
        })
      })
      this.arrcheck = arrtemp1
      // var arrtemp1 = []
      // this.treelist.forEach(item1 => {
      //   arrtemp1.push(item1.id)
      //   item1.children.forEach(item2 => {
      //     arrtemp1.push(item2.id)
      //     item2.children.forEach(item3 => {
      //       arrtemp1.push(item2.id)
      //     })
      //   })
      // })
      this.setRoleRightsDialogVisible = true
    },
    // 取消权限
    async deleRight (roleId, rightId) {
      // - 请求路径：roles/:roleId/rights/:rightId
      // - 请求方法：delete
      const res = await this.$$http.delete(`roles/${roleId}/rights/${rightId}`)
      console.log(res)
      res.children = res.data.data
      // this.getRoleslist() 取消权限会返回取消后的权限，还可以只更新单行，没必要更新整个视图
    },
    async getRoleslist () {
      // - 请求路径：rights/:type   - 请求方法：get
      const res = await this.$http.get('roles')
      console.log(res.data.data)
      this.roleslist = res.data.data
    }
  }
}
</script>

<style>
.addRole {
  margin-top: 20px;
}
.rolesTable {
  margin-top: 20px;
}
</style>
