<template>
  <div class="home">
    <div class="list">
      <Item
        v-for="hashtag in orderBy(hashtags,'date',-1)"
        :key="hashtag.id"
        :id="hashtag.id"
        :uid="hashtag.uid"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Item from '@/components/Item.vue'

import { db } from '../main'
import Vue2Filters from 'vue2-filters'

export default {
  name: 'Home',
  components: {
    Item
  },
  data () {
    return {
      hashtags: []
    }
  },
  firestore () {
    return {
      hashtags: db.collection('hashtags')
    }
  },
  mixins: [Vue2Filters.mixin]
}
</script>
