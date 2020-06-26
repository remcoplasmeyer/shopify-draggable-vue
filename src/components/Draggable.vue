<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import VueDragStart from '../events/VueDragStart';

export default {
  props: ['group'],
  mounted() {
    // Gets fired when draggable gets initialized
    this.$draggable.on('draggable:initialize', this.onDragInitialize);
    // Gets fired when draggable gets destroyed
    this.$draggable.on('draggable:destroy', this.onDragDestroy);
    // Gets fired when drag action begins
    this.$draggable.on('drag:start', this.onDragStart);
    // Gets fired when moving a draggable around
    this.$draggable.on('drag:move', this.onDragMove);
    // Gets fired when dragging over other draggable
    this.$draggable.on('drag:over', this.onDragOver);
    // Gets fired when dragging over other draggable container
    this.$draggable.on('drag:over:container', this.onDragOverContainer);
    // Gets fired when dragging out of other draggable
    this.$draggable.on('drag:out', this.onDragOut);
    // Gets fired when dragging out of other draggable container
    this.$draggable.on('drag:out:container', this.onDragOutContainer);
    // Gets fired when draggable has been released
    this.$draggable.on('drag:stop', this.onDragStop);
    // Gets fired when using force touch on draggable element
    this.$draggable.on('drag:pressure', this.onDragPressure);
  },
  destroyed() {
    this.$draggable.off('draggable:initialize', this.onDragInitialize);
    this.$draggable.off('draggable:destroy', this.onDragDestroy);
    this.$draggable.off('drag:start', this.onDragStart);
    this.$draggable.off('drag:move', this.onDragMove);
    this.$draggable.off('drag:over', this.onDragOver);
    this.$draggable.off('drag:over:container', this.onDragOverContainer);
    this.$draggable.off('drag:out', this.onDragOut);
    this.$draggable.off('drag:out:container', this.onDragOutContainer);
    this.$draggable.off('drag:stop', this.onDragStop);
    this.$draggable.off('drag:pressure', this.onDragPressure);
  },
  methods: {
    onDragMove(event) {},
    onDragOver(event) {},
    onDragInitialize(event) {},
    onDragOut(event) {},
    onDragOutContainer(event) {},
    onDragStop(event) {
      this.$emit('stop');
    },
    onDragOverContainer(event) {},
    onDragPressure(event) {},
    onDragDestroy(event) {

    },
    getDraggable(event) {
      return event.originalEvent.target.closest(
        `.${this.$draggable.options.draggableClass}`,
      );
    },
    onDragStart(_event) {
      const event = _event;
      // handles scrollable content in draggable div
      const shouldIgnore = this.$draggable.options.ignoreHandleClassList.some(
        (className) => event.sensorEvent.target.classList.contains(className),
      );
      if (shouldIgnore) {
        event.cancel();
        return;
      }

      // Handles nested draggables
      if (this.$el !== this.getDraggable(event)) {
        return;
      }

      // We cannot drag into inputs
      if (event.originalEvent.target.tagName === 'INPUT') {
        event.cancel();
        return;
      }

      this.$draggable.trigger(
        new VueDragStart({
          ...event.data,
          sourceComponent: this,
        }),
      );
      this.$emit('start');

      event.source._source = {
        oldComponent: this,
      };
    },
  },
  render(c) {
    let item = this.$scopedSlots.default()[0];
    if (item.tag === undefined) {
      item = c('span', {}, [item]);
    }
    const data = item.data || {};
    data.class = {
      ...data.class,
      [this.$draggable.options.draggableClass]: true,
      [this.$draggable.options.dragHandleClass]:
        this.$attrs['with-handle'] === true,
    };
    data.attrs = {
      ...data.attrs,
      'data-draggable-mirror': JSON.stringify(this.$attrs['draggable-mirror']),
    };
    item.data = data;
    return item;
  },
};
</script>
