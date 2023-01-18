import {v1} from "uuid";
import {useState} from "react";
import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {
    AddTodoListAC,
    ChangeTodolistFilter, ChangeTodolistFilterAC,
    ChangeTodolistTitle, ChangeTodolistTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./todolists-reducer";


test('correct todolist should be removed', () =>{
    //Тестовые данные
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'},
    ]
    // 2. Вызов тестируемой функции:
    const endStart = todolistsReducer(startState, RemoveTodoListAC(todolistId2))
    // 3. Сверка результата с ожиданием:
    expect(endStart.length).toBe(1);
    expect(endStart[0].id).toBe(todolistId1)

})


test('correct todolist should be added', () =>{
    //Тестовые данные
    const todolistId1 = v1()
    const todolistId2 = v1()

    let newTodolistTitle = "New Todolist"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'},
    ]

    const endStart = todolistsReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endStart.length).toBe(3);
    expect(endStart[2].title).toBe(newTodolistTitle)

})

test('correct filter of todolist should be changed', ()=>{
    const todolistId1 = v1()
    const todolistId2 = v1()

    let newFilter: FilterValuesType = "completed"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'},
    ]

    const action: ChangeTodolistFilter = {
        type: "CHANGE-TODOLIST-FILTER",
        filter: newFilter,
        id: todolistId2
    }

    const endStart = todolistsReducer(startState, ChangeTodolistFilterAC(newFilter, todolistId2))

    expect(endStart[0].filter).toBe("all");
    expect(endStart[1].filter).toBe(newFilter);
});

test('correct todolist should change its name', ()=>{
    const todolistId1 = v1()
    const todolistId2 = v1()

    let newTodolistTitle: string = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'},
    ]

    const action: ChangeTodolistTitle = {
        type: "CHANGE-TODOLIST-TITLE",
        title: newTodolistTitle,
        id: todolistId2
    };

    const endStart = todolistsReducer(startState, ChangeTodolistTitleAC(newTodolistTitle, todolistId2))

    expect(endStart[0].title).toBe("What to learn");
    expect(endStart[1].title).toBe(newTodolistTitle);
})