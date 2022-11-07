
import './style.scss'
import Button from "./components/button/Button"
import { render } from "./utils/renderDOM"
import template from './template.js'


const button = new Button({
    className: 'my-class',
    text: "Click me",
    events: {
      // Названия события точно такие же, как и у первого аргумента addEventListener: 
      // click, mouseEnter, ...
      click: event => {
        console.log(event)
      },
    },
  })

// app — это class дива в корне DOM
render(button, ".app")

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
  button.setProps({
    className: 'otherClass',
    child: 'Click me, please',
  });
}, 1000)

