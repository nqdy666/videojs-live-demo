<template>
  <div class="__p_350_uid_1">
    <div class="__p_350_uid_6">
      <span @click="handleBack10" class="__p_350_uid_10">财富</span>
      <span class="__p_350_uid_11">
        <i class="cubeic-search"></i>
      </span>
    </div>
    <div class="__p_350_uid_7">
      <p class="__p_350_uid_12">内容</p>
      <cube-button type="primary" class="__p_350_uid_13" @click="sendRequest">发请求</cube-button>
    </div>
    <cube-tab-bar value="收藏" :data="data" class="__p_350_uid_9"></cube-tab-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          label: "首页",
          icon: "cubeic-home"
        },
        {
          label: "收藏",
          icon: "cubeic-like"
        }
      ]
    };
  },
  methods: {
    handleBack10() {
      this.$router.push("/");
    },
    sendRequest() {
      this.$axios({
        method: "get",
        url: "https://cnodejs.org/api/v1/topics",
        params: {
          page: 1,
          limit: 1
        }
      })
        .then(() => {
          this.$createToast({
            type: "correct"
          }).show();
        })
        .catch(() => {
          this.$createToast({
            type: "error"
          }).show();
        });
    }
  }
};
</script>
<style scoped>
.__p_350_uid_10 {
  padding-left: 10px;
}

.__p_350_uid_11 {
  padding-right: 10px;
}

.__p_350_uid_6 {
  background: #ff874b;
  color: #ffffff;
  display: flex;
  position: relative;
  justify-content: space-between;
  line-height: 50px;
}

.__p_350_uid_12 {
  font-size: 30px;
  text-align: center;
  margin-top: 50px;
}

.__p_350_uid_7 {
  position: relative;
  flex: 1;
  overflow: auto;
}

.__p_350_uid_9 {
  border-top: 1px solid #ff874b;
}

.__p_350_uid_1 {
  display: flex;
  flex-direction: column;
}

.__p_350_uid_13 {
  margin-top: 20px;
  background-color: #ff874b;
}
</style>