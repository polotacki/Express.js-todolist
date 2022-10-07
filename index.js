const express = require('express')
const Console = require("console")
const fs = require('fs')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (request, response) => {
    return response.send("Hello, world!")
})
app.get('/todos', (request, response) => {

    const showPending=request.query.showpending

    fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return response.status(500).send('sorry, something went wrong.')


        }
        const todos = JSON.parse(data)
        if(showPending !=="1"){ return response.json({todos: todos})
        }else {
            return response.json({todos: todos.filter(t=>{return t.Complete===false})})
        }

    })
})
app.put('/todos/:id/Complete', (request, response) => {
    const id = request.params.id
    const findTodoById = (todos, id) => {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === parseInt(id)) {
                return i
            }

        }
        return -1
    }
    fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return response.status(500).send('sorry, something went wrong.')


        }
        let todos = JSON.parse(data)
        const todoIndex = findTodoById(todos, id)
        if (todoIndex === -1) {
            return response.status(404).send('sorry, not found.')
        }
        todos[todoIndex].Complete =true

        fs.writeFile('./store/todos.json',JSON.stringify(todos),()=>{
            return response.json({'status':'ok'})
        })

    })
})


app.post('/todo', (request, response) => {
if(!request.body.name ){
    return response.status(400).send('Missing name')



}
    fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return response.status(500).send('sorry, something went wrong.')


        }
        const todos = JSON.parse(data)
        const maxId = Math.max.apply(Math,todos.map(t => {return t.id}))
        todos.push
        ({
            id: maxId+1,
                name:request.body.name,
                 Complete : false
        })
        fs.writeFile('./store/todos.json',JSON.stringify(todos),()=>{
            return response.json({'status':'ok'})
        })


    })
})



app.listen(3000, () => {
    Console.log('Application running on http://localhost:3000')
})

