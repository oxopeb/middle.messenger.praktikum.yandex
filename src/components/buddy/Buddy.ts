import { default as Block } from '../../modules/block/'
import { IProps } from '../../modules/block/'
import { template } from './template'


export class Buddy extends Block {
    constructor(props:IProps, tagName='div') {
        props.classes="userchat"
        super(props, tagName)
    }
    render ():string {
        return this.compile(template, this.props)
    }
}

