
import signinPage from '../../views/signin'
import signupPage from '../../views/signup'
import badRoute from '../../views/400'
import serverError from '../../views/500'
import base from '../../views/base'
import chat from '../../views/chat'
import user from '../../views/user'
import { default as Block } from '../../modules/block/'



export function generatePage(pageName: string): Block {
    let result: unknown
    switch (pageName) {
        case 'signin':
            result = signinPage()
            break
        case 'signup':
            result = signupPage()
            break
        case '400':
            result = badRoute()
            break
        case '500':
            result = serverError()
            break
        case 'chat':
            result = chat()
            break
        case 'user':
            result = user()
            break
        case 'base':
            result = base()
            break
        default: result = base()
    }
    return result as Block

}

