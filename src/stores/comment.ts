import { defineStore } from 'pinia'
import type { CommentInfo } from '@/type'
export const commentStudent = defineStore('comment', {
    state: () => ({
        comment: [] as CommentInfo[] 
    }),
    actions: {
        pushComment(comment: CommentInfo){ 
            this.comment.push(comment)
        }
    }
})