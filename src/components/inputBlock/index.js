import { default as Block } from '/src/modules/block'
import { template } from './template'
import { validate } from '/src/utils/validate'
import './style.scss'


class InputBlock extends Block {
    validateInput = (event) => {
        const element = event.target
        console.log("event", event)
        const name = element.name
        let value = element.value
        if (!validate(value, name)) {
            console.warn("Ошибка")
        }
        else console.log("логин: " + login.value + " пароль: " + password.value)
    }
    constructor(props) {

        props.classes="input_block"
        props.events={
            focus: event => {
                validateInput(event)},
            blur: event => {
                validateInput(event)}
        }
        super(props, 'div')
        
    }
    render() {
        return this.compile(template, this.props)
    }
}

export default InputBlock
