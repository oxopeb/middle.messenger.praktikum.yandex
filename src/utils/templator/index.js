import Handlebars from 'handlebars'

export const compile = (template, props) => {
    console.log("final props", props)
    return Handlebars.compile(template)(props)
}