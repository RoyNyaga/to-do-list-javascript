import DomManipulations from './DomManipulations'
import ProjectModule from './ProjectModule'
import Mixing from './Mixing'
import todo from './todoFactory'
import TodoSaved from './TodoSaved'

const { projects } = DomManipulations

const createProject = () => {
  const projectButton = document.querySelector('#addProjectBtn')
  projectButton.addEventListener('click', (e) => {
    e.preventDefault()
    const projectInputField = document.querySelector('#projectInputField')
    const projectName = document.querySelector('#projectInputField').value
    if (projectName.length > 0) {
      if (!projects.includes(projectName)) {
        ProjectModule.addProject(projectName)
        projectInputField.value = ''
        Mixing.projectValidationExit()
      } else {
        Mixing.projectValidationMessage()
      }
    }
    Mixing.closeTodoForm()
    DomManipulations.showProjectList()
    DomManipulations.displayTodoList()
  })
}

const creatProjectForm = () => {
  const projectbtn = document.querySelector('#project-button')

  projectbtn.addEventListener('click', () => {
    Mixing.openProjectForm()
    createProject()
  })
}

const createTodo = () => {
  const todoButton = document.querySelector('#addTodoBtn')
  todoButton.addEventListener('click', (e) => {
    const project = document.querySelector('#todo-project-input').value
    const title = document.querySelector('#todo-title-input').value
    const description = document.querySelector('#todo-description-input').value
    const dueDate = document.querySelector('#todo-date-input').value
    const priority = document.querySelector('#todo-priority-input').value
    const status = document.querySelector('#todo-status-input').value
    if (title.length > 5 && description.length > 5 && dueDate.length > 5) {
      const todoObj = todo(title, description, dueDate, priority, project, status)
      TodoSaved.addTodo(todoObj)
      Mixing.closeTodoForm()
      Mixing.todoValidationExit()
    } else {
      Mixing.todoValidationMessage()
    }
    localStorage.setItem('todoItems', JSON.stringify(TodoSaved.todo_array))
    DomManipulations.displayTodoList()
    e.preventDefault()
  })
}

const deleteProjectItem = () => {
  const deleteProjectButton = document.querySelector('#delete-project-button')
  deleteProjectButton.addEventListener('click', () => {
    if (projects[DomManipulations.currentProject] === 'DEFAULT PROJECT') {
      Mixing.deletProjectValidation()
    } else {
      if (TodoSaved.todo_array.length !== 0) {
        const arrToDelete = []
        TodoSaved.todo_array.forEach((toDoItem) => {
          if (projects[DomManipulations.currentProject] === toDoItem.projectName) {
            arrToDelete.push(toDoItem)
          }
        })
        TodoSaved.todo_array = TodoSaved.todo_array.filter((n) => !arrToDelete.includes(n))
        localStorage.setItem('todoItems', JSON.stringify(TodoSaved.todo_array))
      }
      ProjectModule.removeProject(projects[DomManipulations.currentProject])
    }
    document.location.reload()
  })
}

const createTodoForm = () => {
  const todoButton = document.querySelector('#todo-button')
  todoButton.addEventListener('click', () => {
    Mixing.openToDoForm()
    const todoProjectInput = document.querySelector('#todo-project-input')
    todoProjectInput.value = projects[DomManipulations.currentProject]
    createTodo()
  })
}

DomManipulations.showProjectList()
creatProjectForm()
createTodoForm()
deleteProjectItem()
