import { default as Block } from '../../modules/block/'
import { IProps } from '../../modules/block/'
import { validateInputBlock } from '../../utils/validate'

export class Input extends Block {

    constructor(props: IProps, tagName = 'input') {

        props.classes = "input_block"
        props.events = {
            focus: event => {
                const target = event.target
                validateInputBlock(target as HTMLInputElement)
            },
            blur: event => {
                const target = event.target
                validateInputBlock(target as HTMLInputElement)
            }
        }
        super(props, tagName)

    }
    render() {
        //this.setProps({ type: "text" })
        //this.element.type as HTMLInputElement = "text"
        const inputElement = this.element as HTMLInputElement
        inputElement.type = "text"
        if (this.props.name) {
            inputElement.name = inputElement.id = this.props.name
        }
        
        return this.compile('', this.props)
    }
}

