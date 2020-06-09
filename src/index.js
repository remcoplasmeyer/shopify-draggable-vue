// const { Draggable } = require("@shopify/draggable");
// import wtf from "@shopify/draggable";
import { Draggable } from '@shopify/draggable';
import Dropzone from './components/Dropzone.vue';
import Sortable from './components/Sortable.vue';
import SortableItem from './components/SortableItem.vue';
import DraggableComponent from './components/Draggable.vue';

// draggable api: https://github.com/Shopify/draggable/issues/372
delete Draggable.Plugins.Focusable;

const VuePlugin = {};
VuePlugin.install = function install(_Vue) {
  const Vue = _Vue;
  const draggableClass = 'draggable-item';
  const dragHandleClass = 'drag-handle';
  const ignoreHandleClassList = ['drag-ignore-handle', 'scrollable'];

  Vue.prototype.$draggable = new Draggable([], {
    draggableClass,
    dragHandleClass,
    delay: 50,
    tresholdDistance: 2,
    draggable: `.${draggableClass}`,
    handle: `.${dragHandleClass}`,
    ignoreHandleClassList,
    mirror: {
      constrainDimensions: true,
    },
    appendTo: 'body',
    scrollable: {
      speed: 20,
      sensitivity: 80,
    },
    // swapAnimation: {
    //   duration: 300,
    //   easingFunction: "ease-in-out",
    //   horizontal: false
    // },
    plugins: [],
  });

  Vue.prototype.$draggable.removePlugin(Draggable.Plugins.Focusable);

  Vue.directive('DragHandle', {
    inserted(el) {
      if (el.getAttribute('drag-disabled') !== 'true') {
        el.classList.add(dragHandleClass);
      }
    },
    update(el) {
      if (el.getAttribute('drag-disabled') !== 'true') {
        el.classList.add(dragHandleClass);
      }
    },
  });
  Vue.component('Dropzone', Dropzone);
  Vue.component('Sortable', Sortable);
  Vue.component('SortableItem', SortableItem);
  Vue.component('Draggable', DraggableComponent);

  Vue.mixin({
    mounted() {
      if (!this.$parent) {
        this.$draggable.addContainer(this.$el);
      }
    },
  });
};

export default VuePlugin;
