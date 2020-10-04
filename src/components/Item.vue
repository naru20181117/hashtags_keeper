<template>
  <li class="item">
    <div class="user-box">
      <div class="avatar" :style="'background-image: url('+user.photoURL+')'">
      </div>
      <p class="user-name">{{ user.name }} </p>
    </div>
    <div v-if="editing" class="editor">
      <textarea v-model="hashtag.content" placeholder="edit hashtag" @keypress.enter="updateHashtag">
      </textarea>
      <p class="message">Press Enter to Change</p>
    </div>
    <div v-else class="content" v-html="hashtag.content"></div>
    <button type="button"
      v-clipboard:copy="hashtag.content"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      class="clipboard">
      <fa icon="paperclip" class="paperclip"/>
      Copy
    </button>
    <button v-if="currentUser && currentUser.uid == user.id" @click="showBtns = !showBtns" class="edit_btn">
      <fa icon="ellipsis-v" />
    </button>
    <div v-if="showBtns" class="controls">
      <li @click="editing = !editing">Edit</li>
      <li @click="deleteHashtag" style="color:red">
        Delete
      </li>
    </div>
  </li>
</template>

<script>
import { db } from '../main'
import { auth } from '../main'

export default {
  methods:{
    deleteHashtag() {
      if (window.confirm('Are you sure you want to delete This?')) {
        db.collection('hashtags').doc(this.$props.id).delete()
      }
    },
    updateHashtag() {
      const date = new Date()
      db.collection('hashtags').doc(this.$props.id).set({
        'content': this.hashtag.content,
        'date':date
      },{merge:true})
      .then(() =>this.editing = false
      )
    },
    onCopy: function (e) {
      alert('You just copied: \n' + e.text)
    },
    onError: function (e) {
      alert('Failed to copy texts')
    }
  },
  props: ['id','uid'],
  data () {
    return {
      hashtag: {},
      user: {},
      currentUser: {},
      showBtns: false,
      editing: false,
      hashtagContent: null
    }
  },
  created () {
    auth.onAuthStateChanged(user => {
      this.currentUser = user
    })
  },
  firestore () {
    return {
      hashtag: db.collection('hashtags').doc(this.$props.id),
      user: db.collection('users').doc(this.$props.uid)
    }
  }
}
</script>

<style lang="stylus">
.item
  list-style none
  border-top 1px solid #eee
  padding 5px 15px
  display flex
  flex-wrap no-wrap
  justify-content flex-start
  position relative
  .editor
    position relative
    width 100%
    textarea
      background transparent
      resize none
      height 80px
      width 96%
      border none
      padding 10px 2%
      font-size .9rem
      font-weight lighter
      &:focus
        outline none
    .message
      opacity 0
      position absolute
      bottom 5px
      right 10px
      transition .2s
      font-size .8rem
    &:hover
      .message
        opacity 1
  &:first-child
    border none
  &:hover
    background rgba(0,0,0,.02)
  .user-box
    margin 10px 10px 10px 0
    .avatar
      height 50px
      width 50px
      border-radius 50%
      border 1px solid #eee
      background-size cover
    .user-name
      margin 5px 0 0 0
      text-align center
      font-size .7rem
      line-height .7rem
      width 50px
  .content
    padding 10px 40px 10px 10px
  .edit_btn
    position absolute
    top 5px
    right 12px
    background transparent
    color #555
    font-size .9rem
    opacity 0
    transition .2s
    border:1px solid #EEE
    box-shadow:rgba(122, 122, 122, 0.0588235) 0px 0px 6px 3px
    -webkit-box-shadow:rgba(122, 122, 122, 0.0588235) 0px 0px 6px 3px
    -moz-box-shadow:rgba(122, 122, 122, 0.0588235) 0px 0px 6px 3px
  .clipboard
    position absolute
    top 50px
    right 8px
    width 3rem
    background transparent
    color #555
    font-size .9rem
    opacity 0
    transition .2s
    -webkit-transition: all 0.5s ease
    -webkit-box-shadow:rgba(122, 122, 122, 0.0588235) 0px 0px 6px 3px
    -moz-box-shadow:rgba(122, 122, 122, 0.0588235) 0px 0px 6px 3px all 0.2s ease
    &:hover
      -webkit-transform: scale( 1.3 )
      -moz-transform: scale( 1.3 )
  .paperclip
    position relative
    right 0px
  .controls
    background white
    position absolute
    top 5px
    right 35px
    box-shadow 0 0 5px rgba(0,0,0,.05)
    border-radius 3px
    opacity 0
    li
      padding 5px 20px
      border-top 1px solid #eee
      cursor pointer
      &:first-child
        border none
  &:first-child
    border none
  &:hover
    background rgba(0,0,0,.02)
    .content
    button
      opacity 1
    .controls
      opacity 1
</style>
