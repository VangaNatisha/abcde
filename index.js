const express = require('express')
const app = express()
const path = require('path');
const { v4: uuidv4 } = require('uuid');
uuidv4();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

const a = [
    {
        id: uuidv4(),
        username: 'nati',
        comment: 'hey thats funny'
    },
    {
        id: uuidv4(),
        username: 'rani',
        comment: 'hey thats cool'
    },
    {
        id: uuidv4(),
        username: 'fizal',
        comment: 'its boring'
    }
]

app.get('/comments', (req, res) => {

    res.render('comments/index', { a })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    a.push({ username, comment, id: uuidv4() })
    res.redirect('/comments');
})
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = a.find(c => c.id === id);
    res.render('comments/show')
})


app.get('/register', (req, res) => {
    console.log(req.body)
    res.send('this is get')
})
app.post('/register', (req, res) => {
    const { emailid, password } = req.body
    res.send(`mail ${emailid} password ${password}`)
})
app.listen(3000, (req, res) => {
    console.log("port started")
})