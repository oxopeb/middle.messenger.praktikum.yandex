
import Handlebars from 'handlebars'
import signinPage from '../../views/signin'
import signupPage from '../../views/signup'
import bad_route from '../../views/400'
import server_error from '../../views/500'
import base from '../../views/base'
import chat from '../../views/chat'
import user from '../../views/user'


const signinData = {
    inputs: [
    {   name:'login',
        title:'Login'
    },
    {   name:'password',
        title:'Password'
    }
    ],
    buttons:[
    {
        name:'signup',
        title:'Create account',
        link:'?page=signup',
        class:'link'
    },
    {
        name:'signin',
        title:'Sign in',
        link:'?page=chat',
        class:'button'
    }
    ]
}
const bad_routeData = {
    buttons:[{
        name:'home_link',
        title:'Home page',
        link:'/',
        class:'link'
    }]
}
const server_errorData = {
    buttons:[
    {
        name:'home_link',
        title:'Home page',
        link:'/',
        class:'link'
    }
    ]
}
const chatData = {
    buttons:[
    {
        name:'user',
        title:'Profile',
        link:'?page=user',
        class:'link profile'
    }
    ]
}
const userData = {
    inputs: [
        {
            name:'email',
            title:'Email'
        },
        {
            name:'login',
            title:'Login'
        },
        {
            name:'first_name',
            title:'Name'
        },
        {
            name:'second_name',
            title:'Surname'
        },
        {
            name:'phone',
            title:'Phone'
        },
        {
            name:'password',
            title:'Password'
        },
        {
            name:'password_repeat',
            title:'Password (repeat)'
        }
        ],
    buttons:[
        {
            name:'chat',
            title:'Back to chat',
            link:'?page=chat',
            class:'link'
        },
        {
            name:'save',
            title:'Save',
            link:'?page=user',
            class:'button'
        }
        ]
}
const baseData = {
    buttons:[
    {
        name:'signin_link',
        title:'Sign in',
        link:'/?page=signin',
        class:'button'
    },
    {
        name:'signup_link',
        title:'Sign up',
        link:'/?page=signup',
        class:'button'
    },
    {
        name:'chat_link',
        title:'Chat',
        link:'/?page=chat',
        class:'button'
    },
    {
        name:'signup_link',
        title:'User',
        link:'/?page=user',
        class:'button'
    },
    {
        name:'400_link',
        title:'Error 400',
        link:'/?page=400',
        class:'button'
    },
    {
        name:'500_link',
        title:'Error 500',
        link:'/?page=500',
        class:'button'
    }
]
}
const signupData = {
    inputs: [
        {
            name:'email',
            title:'Email'
        },
        {
            name:'login',
            title:'Login'
        },
        {
            name:'first_name',
            title:'Name'
        },
        {
            name:'second_name',
            title:'Surname'
        },
        {
            name:'phone',
            title:'Phone'
        },
        {
            name:'password',
            title:'Password'
        },
        {
            name:'password_repeat',
            title:'Password (repeat)'
        }
        ],
    buttons:[
        {
            name:'signin',
            title:'Back to sign in',
            link:'?page=signin',
            class:'link'
        },
        {
            name:'signup',
            title:'Sign up',
            link:'?page=signup',
            class:'button'
        }
        ]
    
}


export function generatePage(pageName) {

    switch (pageName) {
        case 'signin': return signinPage(signinData); break;
        case 'signup': return signupPage(signupData); break;
        case '400': return bad_route(bad_routeData); break;
        case '500': return server_error(server_errorData); break;
        case 'chat': return chat(chatData); break;
        case 'user': return user(userData); break;
        case 'base': return base(baseData);  break;
        default: return base(baseData);
    }

}


export function render(element, content) {
    document.getElementById(element).innerHTML = content;
}
