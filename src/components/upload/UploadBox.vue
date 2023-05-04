<template>
  <div>
    <el-card>
      <el-form label-position="top" ref="form" :model="formData">
        <el-form-item label="活动标题">
          <el-input
            v-model="formData.title"
            placeholder="请输入活动标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容简介">
          <el-input
            v-model="formData.summary"
            type="textarea"
            maxlength="1000px"
            show-word-limit
            placeholder="请输入内容简介（200字以内）"
            :autosize="{ minRows: 5, maxRows: 10 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面图片">
          <el-upload
            action="/api/upload/cover"
            accept="image/*"
            :on-success="handleUploadSuccess"
          >
            <el-button type="primary">点击上传</el-button>
          </el-upload>
          <img v-if="formData.cover" :src="formData.cover" alt="封面图片" />
        </el-form-item>
        <el-form-item label="富文本编辑器">
          <ckeditor
            v-model="formData.content"
            :editor="editor"
            :config="editorConfig"
            @ready="onReady"
          ></ckeditor>
        </el-form-item>
        <el-form-item label="视频">
          <el-upload
            action="/api/upload/video"
            accept="video/*"
            :on-success="handleVideoUploadSuccess"
          >
            <el-button type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { CKEditor } from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

export default {
  name: "UploadBox",
  data() {
    return {
      formData: {
        title: "",
        summary: "",
        cover: "",
        content: "",
        videoUrl: "",
      },
      editor: ClassicEditor,
      editorConfig: {
        height: "500px",
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        var address = "http://localhost:3001/uploadEvent";
        const response = await axios.post(address, this.formData);
        if (response.status === 200 || response.status === 201) {
          this.$message.success("活动已成功提交");
          this.resetForm();
        } else {
          this.$message.error("提交失败，请稍后重试");
          console.error("response.status==" + response.status);
        }
      } catch (error) {
        console.error("Error:", error);
        this.$message.error("提交失败，请稍后重试");
      }
    },
    resetForm() {
      this.formData = {
        title: "",
        summary: "",
        cover: "",
        content: "",
        videoUrl: "",
      };
    },
    handleUploadSuccess(response, file) {
      this.formData.cover = URL.createObjectURL(file.raw);
    },
    handleVideoUploadSuccess(response, file) {
      this.formData.videoUrl = URL.createObjectURL(file.raw);
    },

    onReady(evt) {
      // 更新 CKEditor 内容样式，在编辑器上方隐藏段落元素
      evt.plugins.get("Paragraph").toModel = () => {
        return this.editor.model.schema.createText("");
      };
    },
  },
  components: {
    ckeditor: CKEditor,
  },
};
</script>

<style scoped></style>
