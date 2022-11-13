import { default as Block } from '../../modules/block/'
import { IProps } from '../../modules/block/'
import { template } from './template'


export class Button extends Block {
    constructor(props:IProps, tagname = 'button') {

        super(props, tagname)
    }
    render(){
        const buttonElement = this.element as HTMLButtonElement
        
        if (this.props.type && this.props.name) {
            buttonElement.type = this.props.type
            buttonElement.name = buttonElement.id = this.props.name
            
        }
        
        return this.compile(template, this.props)
    }
}


