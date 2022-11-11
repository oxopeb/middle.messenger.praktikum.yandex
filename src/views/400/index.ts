import { default as Block } from '../../modules/block'
import { default as Button } from '../../components/button'
import { IProps } from '../../modules/block'
import { template } from './template'

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

    return new Page400(props)
}
