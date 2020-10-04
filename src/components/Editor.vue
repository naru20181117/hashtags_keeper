<template>
  <li class="item">
    <div class="user-box">
      <div class="avatar" :style="'background-image: url('+currentUser.photoURL+')'"></div>
      <p class="user-name">{{currentUser.displayName}}</p>
    </div>
    <div class="editor">
      <textarea placeholder="new hashtag" v-model="newHashtag" @keypress.enter="createHashtag">
      </textarea>
      <p class="message">Press Enter to Post</p>
    </div>
  </li>
</template>

<script>
import { db } from '../main'
export default {
  props: ['currentUser'],
  data () {
    return {
      newHashtag: ''
    }
  },
  methods: {
    createHashtag () {
      const date = new Date()
      db.collection('hashtags').add({
        'content': this.newHashtag,
        'date': date,
        'uid': this.$props.currentUser.uid
      })
      .then(
        this.newHashtag = ''
      )
    }
  }
}
</script>
