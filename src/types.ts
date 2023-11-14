export interface SubtaskType{
    title: string
    isCompleted: boolean
}

export interface TaskType {
    title: string
    description: string
    status: string
    _id: string
    subtasks: SubtaskType[]
}

export interface ColumnType {
    name: string
    tasks: TaskType[]
}

export type BoardType = {
    _id: string
    name: string
    columns: ColumnType[]
}

export type BoardsType = BoardType[]