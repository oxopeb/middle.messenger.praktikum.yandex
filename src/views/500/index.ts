import { default as Block } from '../../modules/block'
import { IProps } from '../../modules/block'
import { default as Button } from "../../components/button"
import { template } from './template'

class Page500 extends Block {
    constructor(props:IProps, tagName = 'main') {

        super(props, tagName)
    }
    render() {
        return this.compile(template, this.props);

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
                settings: { withInternalID: true },
                events: {
                    click: () => {
                        window.location.href = '/?page=base'
                    },
                }
            })
    }

    return new Page500(props)
}
