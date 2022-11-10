import path from 'path'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000
const root = path.resolve('./');

app.use(express.static(path.join(root, 'dist')))

app.use('*', (req, res) => {
    res.sendFile(path.join(root, 'dist/index.html'))
})

app.listen(PORT, () => { 
    console.log(`http://localhost:${PORT}`)
});
