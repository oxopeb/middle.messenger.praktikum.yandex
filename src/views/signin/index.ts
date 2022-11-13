import { default as Block } from '../../modules/block'
import { default as Button } from "../../components/button"
import { default as Input } from '../../components/input'
import { default as InputBlock } from '../../components/inputBlock'
import { validateInputForm } from '../../utils/validate'
import { IProps } from '../../modules/block/'
import { template } from './template'


export type IInputsObject = {
    "login"?: HTMLInputElement,
    "password"?: HTMLInputElement,
}
class SignIn extends Block {
    constructor(props:IProps, tagName = 'main') {
        super(props, tagName )
    }
    render(){
        return this.compile(template, this.props);

    } 

}

export default () => {
    const props:IProps = {
        inputLogin: new InputBlock({
            title: 'Login',
            name: 'login',
            settings: { withInternalID: true },
            input: new Input({
                name: 'login',
                type: 'text',
                title: 'Login',
                settings: { withInternalID: true }
            })
        }),
        inputPassword: new InputBlock({
            title: 'Password',
            name: 'password',
            settings: { withInternalID: true },
            input: new Input({
                name: 'password',
                type: 'password',
                title: 'Password',
                settings: { withInternalID: true }
            })
        }),
        buttonSignIn:
            new Button({
                name: 'signin_link',
                title: 'Sign in',
                link: '#',
                type: 'submit',
                class: 'button',
                settings: { withInternalID: true },
                events: {
                    click: (event: Event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        const inputs:IInputsObject  = {
                            "login": document.querySelector("input[name='login']") as HTMLInputElement,
                            "password": document.querySelector("input[name='password']") as HTMLInputElement
                        }
                        validateInputForm(inputs)
                    },
                }
            }),
        buttonSignUp: new Button({
            name: 'signup_link',
            title: 'Sign up',
            link: '/?page=signup',
            type: 'button',
            class: 'link',
            settings: { withInternalID: true },
            events: {
                click: () => {
                    window.location.href='/?page=signup'
                },
            }
        })
    }

    return new SignIn(props)
}
