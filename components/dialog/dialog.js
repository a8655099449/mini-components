/*
 * @Author: kuangw 865509949@qq.com
 * @Date: 2022-12-02 17:10:40
 * @LastEditors: kuangw 865509949@qq.com
 * @Description: 文件描述
 */
Component({
  data: {
    show: false,
    callback: () => {},
  },
  properties: {},
  methods: {
    show() {
      this.setData({ show: true });
    },
    close(status = "ok") {
      this.setData({ show: false });
      wx.nextTick(() => {
        const { callback } = this.data;
        if (callback) {
          callback(status, this);
        }
      });
    },
    handleClickOk() {
      // this.clickOk()
      this.close("ok");
    },
    clickCancel() {
      this.close("cancel");
    },
  },
});
