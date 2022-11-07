import { default as Block } from '/src/modules/block'
import { template } from './template'
import './style.scss'


class Buddy extends Block {
    constructor(props) {
        props.classes="userchat"
        super({...props}, 'div')
    }
    render () {
        return this.compile(template, this.props)
    }
}

export default Buddy

