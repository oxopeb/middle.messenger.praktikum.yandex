import { default as Block } from '/src/modules/block'
import { default as Button } from "/src/components/button"
import { template } from './template'
import './style.scss'

class Page500 extends Block {
    constructor(props) {
        console.log("props", props)

        super(props, 'div')
    }
    render() {
        //console.warn("template", template)
        //console.warn("this.props", this.props)
        //return compile(template, this.props)
        return this.compile(template, this.props);

    }
}

export default () => {
    const props = {        
        buttonHome:
            new Button({
                name: 'home_link',
                title: 'Home page',
                link: '/',
                class: 'link',
                settings: { withInternalID: true }
            })
    }

    const page = new Page500(props)
    return page
}
