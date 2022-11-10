import Handlebars, { TemplateDelegate } from 'handlebars'
import { IProps } from '../../modules/block/Block'


export const compile = (template:TemplateDelegate, props:IProps):string => {
    return Handlebars.compile(template)(props)
}