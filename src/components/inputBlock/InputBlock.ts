import { default as Block } from '../../modules/block'
import { IProps } from '../../modules/block/'
import { template } from './template'
import { validateInput } from '../../utils/validate'


export class InputBlock extends Block {


    constructor(props:IProps, tagname='div') {

        props.classes = "input-block"
        props.events = {
            focus: event => {
                validateInput(event.target as HTMLInputElement)},
            blur: event => {
                validateInput(event.target as HTMLInputElement)}
        }
        super(props, tagname)
        
    }
    render() {
        return this.compile(template, this.props)
    }
}
