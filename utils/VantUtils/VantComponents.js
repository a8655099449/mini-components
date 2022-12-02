/*
 * @Author: kuangw 865509949@qq.com
 * @Date: 2022-12-02 16:22:16
 * @LastEditors: kuangw 865509949@qq.com
 * @Description: 文件描述
 */

export const basic = Behavior({
  methods: {
    $emit(
      name,
      detail,
      options
    ) {
      this.triggerEvent(name, detail, options);
    },

    set(data) {
      this.setData(data);

      return new Promise((resolve) => wx.nextTick(resolve));
    },
  },
});

function mapKeys(
  source,
  target,
  map
) {
  Object.keys(map).forEach((key) => {
    if (source[key]) {
      target[map[key]] = source[key];
    }
  });
}

function VantComponent(vantOptions) {
  const options = {};

  mapKeys(vantOptions, options, {
    data: 'data',
    props: 'properties',
    mixins: 'behaviors',
    methods: 'methods',
    beforeCreate: 'created',
    created: 'attached',
    mounted: 'ready',
    destroyed: 'detached',
    classes: 'externalClasses',
  });

  // add default externalClasses
  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push('custom-class');

  // add default behaviors
  options.behaviors = options.behaviors || [];
  options.behaviors.push(basic);

  // add relations
  const { relation } = vantOptions;
  if (relation) {
    options.relations = relation.relations;
    options.behaviors.push(relation.mixin);
  }

  // map field to form-field behavior
  if (vantOptions.field) {
    options.behaviors.push('wx://form-field');
  }

  // add default options
  options.options = {
    multipleSlots: true,
    addGlobalClass: true,
  };

  Component(options);
}

export { VantComponent };
const MIN_DISTANCE  = 10
export function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }

  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }

  return '';
}

export const touch = Behavior({
  methods: {
    resetTouchStatus() {
      this.direction = '';
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    },

    touchStart(event) {
      this.resetTouchStatus();
      const touch = event.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
    },

    touchMove(event) {
      const touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction =
        this.direction || getDirection(this.offsetX, this.offsetY);
    },
  },
});
