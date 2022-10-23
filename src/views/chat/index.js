import Handlebars from 'handlebars'

import fs from 'fs'
const tpl = fs.readFileSync(__dirname + '/index.hbs', 'utf8')
// import tpl from 'bundle-text:./index.hbs'
import './style.scss'

Handlebars.registerPartial('chat',tpl)

export default (props={}) =>{
    return Handlebars.compile(tpl)(props)
}