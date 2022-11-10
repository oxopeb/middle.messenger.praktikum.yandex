import { default as Block } from '../../modules/block'
import { default as Button } from "../../components/button"
import { default as Input } from '../../components/input'
import { default as InputBlock } from '../../components/inputBlock'
import { validateInputForm } from '../../utils/validate'
import { IProps } from '../../modules/block/'
import { template } from './template'

class SignIn extends Block {
    constructor(props:IProps, tagName = 'div') {
        super(props, tagName )
    }
    render():string {
        return this.compile(template, this.props);

    } 

}

export default () => {
    const props:IProps = {
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
                    click: () => {
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
