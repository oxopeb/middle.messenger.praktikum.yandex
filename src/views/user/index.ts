import { default as Block } from '../../modules/block'
import { default as Button } from "../../components/button"
import { default as Input } from '../../components/input'
import { default as InputBlock } from '../../components/inputBlock'
import { validateInputForm } from '../../utils/validate'
import { IProps } from '../../modules/block/'
import { template } from './template'
import './style.scss'

export type IInputsObject = {
    "login"?: HTMLInputElement,
    "password"?: HTMLInputElement,
    "password_repeat"?: HTMLInputElement,
    "phone"?: HTMLInputElement,
    "email"?: HTMLInputElement,
    "first_name"?: HTMLInputElement,
    "second_name"?: HTMLInputElement,
    "message"?: HTMLInputElement
}


class UserPage extends Block {
    constructor(props: IProps, tagName = 'main') {
        super(props, tagName)


    }
    render() {
        return this.compile(template, this.props)
    }
}

export default () => {
    const props: IProps = {
        inputEmail: new InputBlock({
            title: 'Email',
            name: 'email',
            settings: { withInternalID: true },
            input: new Input({
                name: 'email',
                type: 'email',
                title: 'Email',
                settings: { withInternalID: true }
            })
        }),
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
        inputFirstName: new InputBlock({
            title: 'Name',
            name: 'first_name',
            settings: { withInternalID: true },
            input: new Input({
                name: 'first_name',
                type: 'text',
                title: 'Name',
                settings: { withInternalID: true }
            })
        }),
        inputSecondName: new InputBlock({
            title: 'Surname',
            name: 'second_name',
            settings: { withInternalID: true },
            input: new Input({
                name: 'second_name',
                type: 'text',
                title: 'Surname',
                settings: { withInternalID: true }
            })
        }),
        inputPhone: new InputBlock({
            title: 'Phone',
            name: 'phone',
            settings: { withInternalID: true },
            input: new Input({
                name: 'phone',
                type: 'text',
                title: 'Phone',
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
            }),
        }),
        inputPasswordRepeat: new InputBlock({
            title: 'Password (repeat)',
            name: 'password_repeat',
            settings: { withInternalID: true },
            input: new Input({
                name: 'password_repeat',
                type: 'password',
                title: 'Password',
                settings: { withInternalID: true }
            }),
        }),
        buttonChat: new Button({
            name: 'chat',
            title: 'Back to chat',
            link: '/?page=chat',
            type: 'button',
            class: 'link',
            settings: { withInternalID: true },
            events: {
                click: () => {
                    window.location.href = '/?page=chat'
                },
            }
        }),
        buttonSave: new Button({
            name: 'save',
            title: 'Save',
            link: '/?page=user',
            type: 'submit',
            class: 'button',
            settings: { withInternalID: true },
            events: {
                click: (event: Event) => {
                    event.preventDefault()
                    const inputs: IInputsObject = {
                        "login": document.querySelector("input[name='login']") as HTMLInputElement,
                        "password": document.querySelector("input[name='password']") as HTMLInputElement,
                        "password_repeat": document.querySelector("input[name='password_repeat']") as HTMLInputElement,
                        "phone": document.querySelector("input[name='phone']") as HTMLInputElement,
                        "email": document.querySelector("input[name='email']") as HTMLInputElement,
                        "first_name": document.querySelector("input[name='first_name']") as HTMLInputElement,
                        "second_name": document.querySelector("input[name='second_name']") as HTMLInputElement
                    }
                    validateInputForm(inputs)
                },
            }
        })
    }

    return new UserPage(props)
}
