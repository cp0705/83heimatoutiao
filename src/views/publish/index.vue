<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <el-form ref="myform" :model="formData" :rules="publishRules" style="margin-left:100px" label-width="100px">
      <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
          <quill-editor style="height:300px" v-model="formData.content" placeholder="请输入内容"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="cover" style="margin-top:120px">
          <el-radio-group v-model="formData.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 封面组件 -->
      <cover-image @selectOneImg="receviceImg" :images="formData.cover.images"></cover-image>
      <el-form-item label="频道" prop="channel_id">
          <el-select
          v-model="formData.channel_id"
          filterable
          placeholder="请选择"
        >
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish(false)">发布文章</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        title: '', // 标题
        content: '', // 内容
        channel_id: null, // 频道
        cover: {// 封面
          type: 0, // -1:自动，0-无图，1-1张，3-3张
          images: []
        }
      },
      publishRules: {
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 30, message: '标题长度5~30个字符之间' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]

      },
      channels: []
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params
    debugger
    articleId && this.getArticle(articleId)
  },
  methods: {
    receviceImg (img, index) {
    //   this.formData.cover.images.splice(index, 1, img)
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? img : item)
    },
    changeType () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    getArticle (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        this.formData = res.data
      })
    },
    publish (draft) {
      this.$refs.myform.validate(isOk => {
        if (isOk) {
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft }, // true 为草稿 false为正式内容
            data: this.formData
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  }
}
</script>

<style>
</style>
