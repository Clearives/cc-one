<template>
  <div class="create-post">
    <el-row>
    <el-col :span="24">
      <el-form ref="articleCreate" :model="post" :rules="createRules" >
        <el-row style="margin-top:20px">
          <el-col :span='10' :push="1">
            <el-form-item label="文章标题" label-width="90px" prop="title">
              <el-input v-model="post.title" style="width:260px" placeholder="请在此处输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="3" >
            <!-- <el-form-item label="所属分类" label-width="90px" prop="classify">
              <el-select v-model="post.classify" placeholder="请选择分类">
                <el-option v-for="item in classifyList" :label="item.classify" :value="item.classify"></el-option>
            </el-select> -->
            </el-form-item>
          </el-col>
      </el-row>
        <el-row style="margin-top:20px; border: 1px solid #bfcbd9; border-radius: 8px;">
          <el-col :span='12'>
            <!-- 编辑区 -->
            <el-form-item class="show" prop="content" >
               <el-input type="textarea" v-model="post.content" :rows="25" placeholder="请在此处编辑文章"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <!-- 展示区 -->
            <div class="marked" style="" v-html="markedToHtml"></div>
          </el-col>
        </el-row>
        <el-form-item style="padding:20px 20px 0 0 " >
          <el-button type="primary" style="float:right;" size='small' @click="createPost" :loading="load">{{btnText}}</el-button>
            <el-button style="float:right;margin-right:10px" size='small' @click="cancle" :loading="load">取消</el-button>
      </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import marked from 'marked';
import hlj from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export default {
  data() {
    return {
      post: {
        classify: '',
        title: '',
        content: ''
      },
      classifyList: [],
      createRules: {
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        classify: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ]
      },
      load: false,
      btnText: '立即发布'
    };
  },
  methods: {
    createPost: function() {
      let params = {
        contentToMark: this.markedToHtml,
        ...this.post
      };
      axios.post('/api/create', params).then((res) => {
        console.log(1);
      });
    },
    cancle: function() {

    }
  },
  computed: {
    markedToHtml() {
      marked.setOptions({
        highlight: function (code) {
          return hlj.highlightAuto(code).value;
        }
      });
      return marked(this.post.content);
    }
  },
};
</script>

<style lang="less">
  .create-post {
    box-sizing: border-box;
    .el-form-item {
      margin-bottom: 0;
    }
    .el-textarea__inner {
      border: none;
      border-right: 1px solid #bfcbd9;
      border-radius: 0;
      background: transparent;
      padding: 15px;
    }
    .marked {
      height: 553px;
      overflow-y: auto;
      background: #fcfaf2;
      color: #000;
      padding: 15px;
      border-radius: 8px;
    }
  }
</style>
