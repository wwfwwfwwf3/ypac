<template>
  <div>
    <el-card>
      <el-form label-position="top" ref="form" :model="formData">
        <el-form-item label="Title">
          <el-input
            v-model="formData.title"
            placeholder="Input a title"
          ></el-input>
        </el-form-item>
        <el-form-item label="Summary">
          <el-input
            v-model="formData.introduction"
            type="textarea"
            maxlength="1000px"
            show-word-limit
            placeholder="Input a summary(less than 200 words)"
            :autosize="{ minRows: 5, maxRows: 10 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="cover image">
          <el-upload
            action="/api/upload/cover"
            accept="image/*"
            :on-success="handleUploadSuccess"
          >
            <el-button type="primary">Image Upload</el-button>
          </el-upload>
          <img v-if="formData.imageCover" :src="formData.imageCover" alt="封面图片" />
        </el-form-item>
        <el-form-item label="Editor">
          <ckeditor
            v-model="formData.text"
            :editor="editor"
            :config="editorConfig"
            @ready="onReady"
          ></ckeditor>
        </el-form-item>
        <el-form-item label="Video URL">
          <el-input
            v-model="formData.video"
            placeholder="Input the video URL"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { CKEditor } from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import axios from "axios";
import apiService from "@/components/utils/ApiService.js";

export default {
  name: "UploadBox",
  data() {
    return {
      formData: {
        title: "",
        introduction: "",
        text: "",
        video: "",
        association: "",
        status: "1",
      },
      editor: ClassicEditor,
      editorConfig: {
        height: "500px",
      },
    };
  },
  methods: {
    async onSubmit() {
      this.formData.association = this.$root.loggedInUsername;
      const result = await apiService.submitArticle(this.formData);
      if (result.success) {
        this.$message.success("活动已成功提交");
        this.resetForm();
      } else {
        this.$message.error(result.error);
      }
    },
    resetForm() {
      this.formData = {
        title: "",
        summary: "",
        cover: "",
        content: "",
        videoUrl: "",
        status: "1",
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
