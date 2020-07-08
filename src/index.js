import { Draggable } from '@shopify/draggable';
import Dropzone from './components/Dropzone.vue';
import Sortable from './components/Sortable.vue';
import SortableItem from './components/SortableItem.vue';
import DraggableComponent from './components/Draggable.vue';

// draggable api: https://github.com/Shopify/draggable/issues/372
delete Draggable.Plugins.Focusable;

const VuePlugin = {};
VuePlugin.install = function install(_Vue, options = {}) {
  const Vue = _Vue;
  const draggableClass = 'draggable-item';
  const dragHandleClass = 'drag-handle';
  const ignoreHandleClassList = ['drag-ignore-handle', 'scrollable'];

  const defaultOpts = {
    draggableClass,
    dragHandleClass,
    delay: 150,
    distance: 0,
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
    plugins: [],
  };

  Vue.prototype.$draggable = new Draggable([], {
    ...defaultOpts,
    ...options,
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
