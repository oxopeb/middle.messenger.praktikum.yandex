import { default as Block } from '/src/modules/block'
import { IProps } from '../../modules/block/'
import { template } from './template'
import { validateInput } from '../../utils/validate'


export class InputBlock extends Block {


    constructor(props:IProps, tagname='div') {

        props.classes = "input_block"
        props.events = {
            focus: event => {
                validateInput(event)},
            blur: event => {
                validateInput(event)}
        }
        super(props, tagname)
        
    }
    render():string {
        return this.compile(template, this.props)
    }
}
