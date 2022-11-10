import { default as Block } from '/src/modules/block'
import { default as Button } from "/src/components/button"
import { template } from './template'
import { IProps } from '../../modules/block'

class Page400 extends Block {
    constructor(props:IProps, tagName = 'div') {

        super(props, tagName)
    }
    render() {
        return this.compile(template, this.props)

    }
}

export default () => {
    const props:IProps = {        
        buttonHome:
            new Button({
                name: 'home_link',
                title: 'Home page',
                link: '/',
                class: 'link',
                settings: { withInternalID: true }
            })
    }

    const page:HTMLElement = new Page400(props)
    return page
}
