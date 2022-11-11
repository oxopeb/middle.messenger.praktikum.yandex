import Handlebars from 'handlebars'
import { IProps } from '../../modules/block/Block'


export const compile = (template:string, props:IProps):string => {
    return Handlebars.compile(template)(props)
}