function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

export const showModel = ({ selector = "#dialog" } = {}) => {
  return new Promise((resolve, reject) => {
    const context = getContext();
    const dialog = context.selectComponent(selector);
    if (dialog) {
      dialog.setData({
        show: true,
        callback: (status = "", instance) => {
          status === "ok" ? resolve(instance) : reject(instance);
        },
      });
    }
  });
};
