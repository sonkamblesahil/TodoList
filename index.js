const express = require('express')
const app = express();
const path = require('path')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    fs.readdir('./files', (err, files) => {
        res.render('index',{files:files})
    })
})

app.post('/created',(req,res)=>{
    const title = req.body.title
    fs.writeFile(`./files/${title.split(' ').join('')}.txt`,req.body.details,(err)=>{
        res.redirect('/')
    })

})


app.get('/file/:filename', (req, res) => {

    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, data) => {
        res.render('show', { filename: req.params.filename, content: data });
    });
});

app.get('/edit/:filename',(req,res)=>{
    res.render('edit',{filename:req.params.filename})
})

app.post('/edit',(req,res)=>{
    fs.rename(`./files/${req.body.prev_name}`,`./files/${req.body.new_name}`,(err)=>{
        res.redirect('/')
    })
      
})
app.listen(3000)