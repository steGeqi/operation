<template>
  <div class="dv-decoration-7">
    <svg width="21px"
         height="20px">
      <polyline stroke-width="4"
                fill="transparent"
                :stroke="mergedColor[0]"
                points="10, 0 19, 10 10, 20" />
      <polyline stroke-width="2"
                fill="transparent"
                :stroke="mergedColor[1]"
                points="2, 0 11, 10 2, 20" />
    </svg>
    <slot></slot>
    <svg width="21px"
         height="20px">
      <polyline stroke-width="4"
                fill="transparent"
                :stroke="mergedColor[0]"
                points="11, 0 2, 10 11, 20" />
      <polyline stroke-width="2"
                fill="transparent"
                :stroke="mergedColor[1]"
                points="19, 0 10, 10 19, 20" />
    </svg>
  </div>
</template>

<script>
import './main.css';

export default {
  name: 'DvDecoration7',
  props: {
    color: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      defaultColor: ['#1dc1f5', '#1dc1f5'],

      mergedColor: []
    }
  },
  watch: {
    color() {
      const { mergeColor } = this

      mergeColor()
    }
  },
  methods: {
    mergeColor() {
      const { color, defaultColor } = this

      this.mergedColor = [...color, ...defaultColor];
    }
  },
  mounted() {
    const { mergeColor } = this

    mergeColor()
  }
}
</script>