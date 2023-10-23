import { defineStore } from 'pinia'
import type { CommentInfo } from '@/type' 
export const commentStudentId = defineStore('comment_id', {
    state: () => ({
        comment_id: [] as CommentInfo[]
    }),
    actions: {
        setComment(comment: CommentInfo[]){ 
            this.comment_id = comment
        }
    }
})
