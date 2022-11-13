
import { default as Block } from '../../modules/block'
import { IProps } from '../../modules/block'
import { default as Button } from '../../components/button'
import { template } from './template'

class Base extends Block {
  constructor(props:IProps, tagName = 'main') {
    super(props, tagName)
  }
  render() {
    return this.compile(template, this.props)

  }
}

const buttonSignIn = new Button({
  name: 'signin_link',
  title: 'Sign in',
  link: '/?page=signin',
  class: 'button',
  settings: { withInternalID: true },
  events: {
    click: () => {
        window.location.href='/?page=signin'
    },
}
})
const buttonSignUp = new Button({
  name: 'signup_link',
  title: 'Sign up',
  link: '/?page=signup',
  type: 'button',
  class: 'button',
  settings: { withInternalID: true },
  events: {
    click: () => {
        window.location.href='/?page=signup'
    },
}
})
const buttonChat = new Button({
  name: 'chat_link',
  title: 'Chat',
  link: '/?page=chat',
  type: 'button',
  class: 'button',
  settings: { withInternalID: true },
  events: {
    click: () => {
        window.location.href='/?page=chat'
    },
}
})
const buttonUser = new Button({
  name: 'user_link',
  title: 'User',
  link: '/?page=user',
  type: 'button',
  class: 'button',
  settings: { withInternalID: true },
  events: {
    click: () => {
        window.location.href='/?page=user'
    },
}
})
const button400 = new Button({
  name: '400_link',
  title: 'Error 400',
  link: '/?page=400',
  type: 'button',
  class: 'button',
  settings: { withInternalID: true },
  events: {
    click: () => {
        window.location.href='/?page=400'
    },
}
})
const button500 = new Button({
  name: '500_link',
  title: 'Error 500',
  link: '/?page=500',
  type: 'button',
  class: 'button',
  settings: { withInternalID: true },
  events: {
    click: () => {
        window.location.href='/?page=500'
    },
}
})
const props:IProps = {
  buttonSignIn: buttonSignIn,
  buttonSignUp: buttonSignUp,
  buttonChat: buttonChat,
  buttonUser: buttonUser,
  button400: button400,
  button500: button500
}

export default () => {

  return new Base(props)
}
