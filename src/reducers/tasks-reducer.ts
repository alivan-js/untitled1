import todoList, {TodoListPropsType} from "../TodoList";
import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}

export type ChangeTodolistTitle ={
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}
export type ChangeTodolistFilter ={
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string
}

type ActionType = RemoveTodoListAT | AddTodoListAT| ChangeTodolistTitle | ChangeTodolistFilter

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType) : Array<TodoListType> =>{
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListID: string = v1()
            const newTodoList: TodoListType = {
                id: newTodoListID, title: action.title, filter: "all"
            }
            return [...todolists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ?{
                ...tl,
                title: action.title
            }: tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ?{
                ...tl,
                filter: action.filter
            }: tl)
        default:
            return todolists
    }
}

export const RemoveTodoListAC = (id: string):RemoveTodoListAT=> ({type:"REMOVE-TODOLIST", id})
export const AddTodoListAC = (title: string):AddTodoListAT=> ({type:"ADD-TODOLIST", title})
export const ChangeTodolistTitleAC = (title: string,  id: string):ChangeTodolistTitle=> ({type:"CHANGE-TODOLIST-TITLE", title, id})
export const ChangeTodolistFilterAC = (    filter: FilterValuesType, id: string):ChangeTodolistFilter=> ({type:"CHANGE-TODOLIST-FILTER", filter, id})