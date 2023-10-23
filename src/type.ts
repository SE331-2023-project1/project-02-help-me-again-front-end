export interface StudentDetail {
    id: number
    firstName: string
    lastName: string
    student_ID: string
    registered: string
    advisor: number
    stu_pic: string
        
}

export interface AdvisorDetail {
    id: number
    firstName: string
    lastName: string
    department?: string
    email?: string
    office?: string
    advisor_pic: string

}