export default {
  data() {
    return {
      count: 0,
    }
  },
  props: {
    items: {
      type: Object,
    },
    category: {
      type: String,
    },
  },
  template: `
    <dl class="list-reset">
      <dt class="font-bold text-purple-dark pb-2 uppercase" >{{category}}</dt>
        <dd class="mb-2" v-for="(item, key) in items" :key="key" >
          <input
            :id="key"
            type="checkbox"
            name="facet"
            v-model="facet"
            :value="key"
          />
          <label :for="key">{{ key }}: {{ item }}</label>
        </dd>
      </dl>
    `,
}
