<template>
  <div class="post-list">
    <el-row>
      <el-col :span="24">
        <el-button size="small" type="primary" @click="createArticle">创建文章</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='24' >
        <el-table 
          style='width:100%' align="center" :data="articleLists" element-loading-text="拼命加载中">
          <el-table-column type='index' width="60" ></el-table-column>
          <el-table-column   prop="created_at" min-width="200" label="创建时间" ></el-table-column>
          <el-table-column  prop="classify" min-width="150" label="所属分类" ></el-table-column>
          <el-table-column  prop="title" min-width="180" label="文章标题" ></el-table-column>
          <el-table-column  min-width="180" label="操作" >
            <template scope='scope'>
              <!--这里点击查看进入具体页面但是路径中必须带有admin,这时具体页面里会出现评论的删除选项  -->
              <el-button size="small" @click="read(scope.row._id)">查看</el-button>
              <el-button size="small" type='primary' @click="editArticle(scope.row._id)">编辑</el-button>
              <el-button size="small" type='danger' @click="remove(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
          </el-table>
        </el-col>
    </el-row>
  </div>
</template>

<script>
// import axios from 'axios';
// import marked from 'marked';
// import hlj from 'highlight.js';
// import 'highlight.js/styles/atom-one-dark.css';

export default {
  data() {
    return {
      articleLists: []
    };
  },
  methods: {
    createArticle: () => {
    }
  },
  computed: {

  },
};
</script>

<style lang="less">

</style>
