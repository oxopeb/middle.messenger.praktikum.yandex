import { default as Block } from '/src/modules/block'
import { template } from './template'
import { validateInputBlock } from '/src/utils/validate'
import './style.scss'

class Input extends Block {

    constructor(props) {

        props.classes = "input_block"
        props.events = {
            focus: event => {
                validateInputBlock(event.target)
            },
            blur: event => {
                validateInputBlock(event.target)
            }
        }
        super(props, 'input')

    }
    render() {
        this.element.type = "text"
        this.element.name = this.element.id = this.props.name
        return false
    }
}

export default Input
