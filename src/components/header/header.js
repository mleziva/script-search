const template = `
  <header :style="{ 'background-color': bgColor }">
    {{ text }}
  </header>
`

export default {
  template,

  props: {
    bgColor: {
      type: String,
      default: '#dde1f3'
    }
  },

  setup () {
    const text = 'Welcome to Minimalistic Vue 3 example'

    return {
      text
    }
  }
}
