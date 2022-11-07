import { default as Block } from '/src/modules/block'
import { default as Button } from '/src/components/button'
import { default as Input } from '/src/components/input'
import { default as InputBlock } from '/src/components/inputBlock'
import { validateInputForm } from '/src/utils/validate'
import { template } from './template'
import './style.scss'

class SignIn extends Block {
    constructor(props) {
        super(props, 'div')
    }
    render() {
        return this.compile(template, this.props);

    }
}

export default () => {
    const props = {
        inputLogin: new InputBlock({
            title: 'Login',
            settings: { withInternalID: true },
            input: new Input({
                name: 'login',
                title: 'Login',
                settings: { withInternalID: true }
            })
        }),
        inputPassword: new InputBlock({
            title: 'Password',
            settings: { withInternalID: true },
            input: new Input({
                name: 'password',
                title: 'Password',
                settings: { withInternalID: true }
            })
        }),
        buttonSignIn:
            new Button({
                name: 'signin_link',
                title: 'Sign in',
                link: '#',
                class: 'button',
                settings: { withInternalID: true },
                events: {
                    click: event => {
                        const inputs = {
                            "login": document.querySelector("input[name='login']"),
                            "password": document.querySelector("input[name='password']")
                        }
                        validateInputForm(inputs)
                    },
                }
            }),
        buttonSignUp: new Button({
            name: 'signup_link',
            title: 'Sign up',
            link: '/?page=signup',
            class: 'link',
            settings: { withInternalID: true }
        })
    }

    const page = new SignIn(props)
    return page
}
