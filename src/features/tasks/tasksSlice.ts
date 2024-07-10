import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface taskProps {
    id: number;
    title: string;
    description: string;
    completed: boolean
}
interface tasksTyp {
    tasks: taskProps[]
    nexId: number
}

export const initialTask: tasksTyp = {
    tasks: [
        {
            id: 0,
            title: "nene",
            description: "wuwuw",
            completed: false
        }
    ],
    nexId: 1
}

export const taskSlice = createSlice({
    name: "tasks",
    initialState: initialTask,
    reducers: {
        addTask: (state, action: PayloadAction<Omit<taskProps, 'id'>>) => {
            state.tasks.push({ ...action.payload, id: state.nexId })
            state.nexId += 1
        },
        deleteTask: (state, action: PayloadAction<{ id: number }>) => {
            const taskFound = state.tasks.findIndex(tasks => tasks.id === action.payload.id)
            if (taskFound >= 0) {
                state.tasks.splice(taskFound, 1)
            }
        },
        editTask: (state, action: PayloadAction<taskProps>) => {
            const { id, title, description } = action.payload
            const taskFound = state.tasks.find(tasks => tasks.id === id)
            if (taskFound) {
                taskFound.title = title;
                taskFound.description = description
            }
        }
    }
})
export const { addTask, deleteTask, editTask } = taskSlice.actions
export default taskSlice.reducer