const express = require('express')
const app = express()

const port = 3000

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

let id = 0
const db = []

app.get('/', (req, res) => {
    res.render('index.ejs', { blogposts: [...db].reverse(), title: "Fake DB CMS" }) // I can pass alot here!
})

app.get('/add', (req, res) => {
    res.render('add.ejs', { title: "Add new" })
})

app
    .route('/edit/:id')
    .get((req, res) => {
        for (r of db) {
            if (r.id == req.params.id) {
                res.render('edit.ejs', { singlePost: db[db.indexOf(r)], title: "Edit" })
            }
        }
    })
    .post((req, res) => {
        for (r of db) {
            if (r.id == req.params.id) {
                db[db.indexOf(r)].title = req.body.title
                db[db.indexOf(r)].text = req.body.text
            }
        }
        // db[req.params.id].title = req.body.title
        // db[req.params.id].text = req.body.text
        res.redirect('/')
    })

app.post('/', (req, res) => {
    db.push({
        id: id++,
        title: req.body.title,
        date: new Date().toLocaleDateString(),
        text: req.body.text
    })
    res.redirect('/')
})

app
    .route('/delete/:id')
    .get((req, res) => {
        for (r of db) {
            if (r.id == req.params.id) db.splice(db.indexOf(r), 1)
        }
        res.redirect('/')

    })


app.listen(process.env.PORT || port)
