import Handlebars from 'handlebars'

import fs from 'fs'
const tpl = fs.readFileSync(__dirname + '/index.hbs', 'utf8')
console.log('message')
// import tpl from 'bundle-text:./index.hbs'
console.log('tpl',tpl)
import './style.scss'

Handlebars.registerPartial('base',tpl)

export default (props={}) =>{
    return Handlebars.compile(tpl)(props)
}