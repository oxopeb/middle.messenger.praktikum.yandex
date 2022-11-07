import { default as Block } from '/src/modules/block'
import { template } from './template'
import './style.scss'



class Button extends Block {
    constructor(props) {

        super(props, 'div')
    }
    render(){
        return this.compile(template, this.props)
    }
}

export default Button
