import { default as Block } from '../../modules/block/'
import { IProps } from '../../modules/block/'
import { validateInputBlock } from '../../utils/validate'

export class Input extends Block {

    constructor(props:IProps, tagName='input') {

        props.classes = "input_block"
        props.events = {
            focus: event => {
                const target:HTMLElement = event.target
                validateInputBlock(target)
            },
            blur: event => {
                const target:HTMLElement = event.target
                validateInputBlock(target)
            }
        }
        super(props, tagName)

    }
    render():void {
        this.element.type = "text"
        this.element.name = this.element.id = this.props.name
        return false
    }
}

