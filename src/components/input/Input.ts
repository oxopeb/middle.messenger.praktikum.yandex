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
        const inputElement = this.element as HTMLInputElement
        if (this.props.name && this.props.type) {
            inputElement.name = this.props.name
            inputElement.type = this.props.type
        }
        
        return this.compile('', this.props)
    }
}

