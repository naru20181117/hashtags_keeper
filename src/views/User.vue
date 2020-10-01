<template>
  <div id="user">
    <div class="user-title">
      <div class="avatar" :style="'background-image: url('+user.photoURL+')'"></div>
      <div class="texts">
        <h1>{{ user.name }}</h1>
        <p v-if="myHashtags.length > 1">{{myHashtags.length}} hashtags</p>
        <p v-else>{{myHashtags.length}} hashtag</p>
      </div>
    </div>
    <div class="list">
      <Item
        v-for="hashtag in orderBy(myHashtags,'date',-1)"
        :key="hashtag.id"
        :id="hashtag.id"
        :uid="hashtag.uid"
      />
    </div>
  </div>
</template>

<script>
import { db } from '../main'
import firebase from 'firebase'
import Item from '@/components/Item'
import Vue2Filters from 'vue2-filters'

export default {
  components: {
    Item
  },
  data () {
    return {
      user: {},
      myHashtags: []
    }
  },
  firestore() {
    return {
      user: db.collection('users').doc(this.$route.params.uid),
      myHashtags: db.collection('hashtags').where('uid','==',this.$route.params.uid)
    }
  },
  mixins: [Vue2Filters.mixin]
}
</script>

<style lang="stylus" scoped>
.user-title
  display flex
  flex-wrap nowrap
  justify-content flex-start
  margin 10px 0
  .avatar
    width 50px
    height 50px
    border-radius 5px
    background-size cover
  .texts
    margin-left 10px
    h1
      font-size 1.5rem
      margin 0
    p
      font-size .8rem
      margin 0
</style>
