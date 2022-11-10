import { default as Block } from '/src/modules/block'
import { default as Button } from '/src/components/button'
import { default as Input }from '/src/components/input'
import { default as Buddy } from '/src/components/buddy'
import { validateInputForm } from '/src/utils/validate'
import { template } from './template'
import './style.scss'


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
                    const inputs = {
                        "message": document.querySelector("input[name='message']")
                    }
                    validateInputForm(inputs)
                },
            }
        })
    }

    const page = new Chat(chatProps)
    return page
}
