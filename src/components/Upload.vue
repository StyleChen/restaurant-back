<template>
  <form id="form-img" enctype="multipart/form-data" name="upload_form" method="post">
    <div class="img_list">
      <div class="img_wraper" v-for="(img,index) in imgs" :key="index">
        <Button type="primary" shape="circle" icon="close" @click="imgs.splice(index, 1)"></Button>
        <!-- <img :src="'http://192.168.2.199:8102/img/'+img+'.jpg'" alt=""> -->
        <img :src="'http://upload.dreamhiway.com/img/'+img+'.jpg'" alt="">
      </div>
    </div>
    <div class="img_picker">
      <Icon type="plus-round"></Icon>
      <input type="file" name="file" @change="upload">
    </div>
  </form>
</template>

<script>
export default {
  props: ['url', 'size', 'imgs'],
  watch: {
    imgs() {
      this.$emit('update:imgs', this.imgs);
    },
  },
  methods: {
    upload(event) {
      if (this.imgs.length >= 1) {
        alert('最多只能上传6张');
        return;
      }
      const formdata = new FormData();
      formdata.append('file', event.target.files[0]);
      this.$http.post(`${this.url}?key=uc&t=${this.size}`, formdata)
        .then(res => res.json())
        .then((res) => {
          this.imgs = [...this.imgs, res.path + res.name];
        });
    },
  },
};
</script>

<style>
#form-img {
  display: flex;
}

.img_list {
  display: flex;
}

.img_list>.img_wraper {
  position: relative;
}

.img_list>.img_wraper>.ivu-btn {
  display: none;
  position: absolute;
  top: 5%;
  right: 15%;
  color: var(--theme);
}

.img_list>.img_wraper:hover>.ivu-btn {
  display: block;
}

#form-img img {
  width: calc(100 / 14 * 1em);
  height: calc(100 / 14 * 1em);
  margin-right: calc(10 / 14 * 1em);
  border: 1px solid var(--border);
  border-radius: 5px;
}

.img_picker {
  position: relative;
  width: calc(100 / 14 * 1em);
  height: calc(100 / 14 * 1em);
  border: 1px solid var(--border);
  border-radius: 5px;
}

.img_picker>input[type=file]:hover {
  cursor: pointer;
}

.img_picker>input[type=file] {
  opacity: 0;
  width: 100%;
  height: 100%;
}

.img_picker>.ivu-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: var(--border);
  font-size: calc(30 / 14 * 1em);
}
</style>
