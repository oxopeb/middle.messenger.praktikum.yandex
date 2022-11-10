import { default as Block } from '../../modules/block'
import { default as Button } from "../../components/button"
import { default as Input } from '../../components/input'
import { default as InputBlock } from '../../components/inputBlock'
import { validateInputForm } from '../../utils/validate'
import { IProps } from '../../modules/block/'
import { template } from './template'
import './style.css'

interface IInputsObject {
    [string:HTMLInputElement]
}


class UserPage extends Block {
    constructor(props: IProps) {
        super(props, 'div')


    }
    render():string {
        return this.compile(template, this.props);
    }
}

export default () => {
    const props: IProps = {
        inputEmail: new InputBlock({
            title: 'Email',
            settings: { withInternalID: true },
            input: new Input({
                name: 'email',
                title: 'Email',
                settings: { withInternalID: true }
            })
        }),
        inputLogin: new InputBlock({
            title: 'Login',
            settings: { withInternalID: true },
            input: new Input({
                name: 'login',
                title: 'Login',
                settings: { withInternalID: true }
            })
        }),
        inputFirstName: new InputBlock({
            title: 'Name',
            settings: { withInternalID: true },
            input: new Input({
                name: 'first_name',
                title: 'Name',
                settings: { withInternalID: true }
            })
        }),
        inputSecondName: new InputBlock({
            title: 'Surname',
            settings: { withInternalID: true },
            input: new Input({
                name: 'second_name',
                title: 'Surname',
                settings: { withInternalID: true }
            })
        }),
        inputPhone: new InputBlock({
            title: 'Phone',
            settings: { withInternalID: true },
            input: new Input({
                name: 'phone',
                title: 'Phone',
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
            }),
        }),
        inputPasswordRepeat: new InputBlock({
            title: 'Password (repeat)',
            settings: { withInternalID: true },
            input: new Input({
                name: 'password_repeat',
                title: 'Password',
                settings: { withInternalID: true }
            }),
        }),
        buttonChat: new Button({
            name: 'chat',
            title: 'Back to chat',
            link: '/?page=chat',
            class: 'link',
            settings: { withInternalID: true }
        }),
        buttonSave: new Button({
            name: 'save',
            title: 'Save',
            link: '/?page=user',
            class: 'button',
            settings: { withInternalID: true },
            events: {
                click: (event: Event) => {
                    event.preventDefault()
                    const inputs: IInputsObject = {
                        "login": document.querySelector("input[name='login']"),
                        "password": document.querySelector("input[name='password']"),
                        "password_repeat": document.querySelector("input[name='password_repeat']"),
                        "phone": document.querySelector("input[name='phone']"),
                        "email": document.querySelector("input[name='email']"),
                        "first_name": document.querySelector("input[name='first_name']"),
                        "second_name": document.querySelector("input[name='second_name']")
                    }
                    validateInputForm(inputs)
                },
            }
        })
    }

    const page = new UserPage(props)
    return page
}
