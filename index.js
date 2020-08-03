const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const books = require('./store/db')

const acl = require('acl');
const permisson = new acl(new acl.memoryBackend());
//permisson.allow('admin', ['blogs', 'forums', 'news'], ['view', 'delete'])
// permisson.allow('guest', 'page_3', ['view'])
// permisson.allow('member', 'page_1', ['view'])
// permisson.allow('admin', 'page_1', ['edit', 'view', 'delete'])
// permisson.allow('admin', 'page_2', ['edit', 'view', 'delete'])

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/getAll', (req, res) => {
    res.json(permisson.backend._buckets)
})


app.get('/users', (req, res) => {
    res.json(permisson.backend._buckets.users)
})

app.post('/setPermissions', (req, res) => {
    console.log(req.body);
    permisson.allow(req.body.role, req.body.allows, req.body.permissions)
    res.json(req.body)
})

app.post('/addUserRoles', (req, res) => {
    permisson.addUserRoles(req.body.name, req.body.role)
    res.json(permisson.backend._buckets.users)
})

app.post('/addRoleParents', (req, res) => {
    console.log(req.body.parents);
    permisson.addRoleParents(req.body.name, req.body.role_parents)
    res.json(permisson.backend._buckets.parents)
})


app.get('/books', (req, res) => {

    console.log(permisson.backend._buckets);
    // A()
    // B()
    res.json(books)
})

function A() {
    const mem = new acl(new acl.memoryBackend());
    mem.allow('member', 'Feture_A', ['view'])
    console.log(mem.backend._buckets);
}

function B() {
    const mem = new acl(new acl.memoryBackend());
    mem.allow('admin', 'Feture_A', ['edit', 'view', 'delete'])
    console.log(mem.backend._buckets);
}


app.post('/books', (req, res) => {
    console.log(req.body);
    res.status(201).json(req.body)
})


app.listen(3000, () => {
  console.log('Start server at port 3000.')
})