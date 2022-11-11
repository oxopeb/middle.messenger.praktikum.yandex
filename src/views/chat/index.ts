import { default as Block } from '../../modules/block'
import { IProps } from '../../modules/block'
import { default as Button } from '../../components/button'
import { default as Input }from '../../components/input'
import { default as Buddy } from '../../components/buddy'
import { validateInputForm } from '../../utils/validate'
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
class Chat extends Block {
    constructor(props:IProps, tagName = 'div') {

        super(props, tagName )
    }
    render() {
        return this.compile(template, this.props);

    }
}


export default () => {
    
    const chatProps:IProps = {
        buddy1: new Buddy({
            buddyName: 'Андрей Анисимов',
            msgBuddy: 'Приве, друг',
            msgTime: '10:05',
            msgCount: '3',
            settings: { withInternalID: true }
        }),        
        buddy2: new Buddy({
            buddyName: 'Андрей Анисимов',
            msgBuddy: 'Приве, друг',
            msgTime: '10:05',
            msgCount: '3',
            settings: { withInternalID: true }
        }),       
        buddy3: new Buddy({
            buddyName: 'Андрей Анисимов',
            msgBuddy: 'Приве, друг',
            msgTime: '10:05',
            msgCount: '1',
            settings: { withInternalID: true }
        }),      
        buddy4: new Buddy({
            buddyName: 'Андрей Анисимов',
            msgBuddy: 'Приве, друг',
            msgTime: '10:05',
            msgCount: '3',
            settings: { withInternalID: true }
        }),       
        buddy5: new Buddy({
            buddyName: 'Андрей Анисимов',
            msgBuddy: 'Приве, друг',
            msgTime: '10:05',
            msgCount: '3',
            settings: { withInternalID: true }
        }),       
        buddy6: new Buddy({
            buddyName: 'Андрей Анисимов',
            msgBuddy: 'Приве, друг',
            msgTime: '10:05',
            msgCount: '3',
            settings: { withInternalID: true }
        }),      
        buddy7: new Buddy({
            buddyName: 'Андрей Анисимов',
            msgBuddy: 'Приве, друг',
            msgTime: '10:05',
            msgCount: '3',
            settings: { withInternalID: true }
        }),          
        buddy8: new Buddy({
            buddyName: 'Андрей Анисимов',
            msgBuddy: 'Приве, друг',
            msgTime: '10:05',
            msgCount: '3',
            settings: { withInternalID: true }
        }),       
        buddy9: new Buddy({
            buddyName: 'Андрей Анисимов',
            msgBuddy: 'Приве, друг',
            msgTime: '10:05',
            msgCount: '3',
            settings: { withInternalID: true }
        }),      
        buddy10: new Buddy({
            buddyName: 'Андрей Анисимов',
            msgBuddy: 'Приве, друг',
            msgTime: '10:05',
            msgCount: '3',
            settings: { withInternalID: true }
        }), 
        inputMessage: new Input({
            name: 'message',
            title: 'Message',
            settings: { withInternalID: true }
        }), 
        buttonUser: new Button({
            name: 'user',
            title: 'Profile',
            link: '/?page=user',
            class: 'link profile',
            settings: { withInternalID: true }
        }),      
        buttonSend: new Button({
            name: 'send',
            title: 'Send',
            link: '#',
            class: 'link send',
            settings: { withInternalID: true },
            events: {
                click: () => {
                    const inputs: IInputsObject= {
                        "message": document.querySelector("input[name='message']") as HTMLInputElement
                    }
                    validateInputForm(inputs)
                },
            }
        })
    }

    return new Chat(chatProps)
}
