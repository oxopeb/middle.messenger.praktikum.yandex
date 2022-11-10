import { default as Block } from '../../modules/block/'
import { IProps } from '../../modules/block/'
import { template } from './template'


export class Button extends Block {
    constructor(props:IProps, tagname = 'div') {

        super(props, tagname)
    }
    render():string{
        return this.compile(template, this.props)
    }
}


