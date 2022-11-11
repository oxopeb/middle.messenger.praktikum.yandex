import './style.scss'

// Компоненты

// Модули
import getPageNameFromUrl from "./utils/routing"
import { generatePage } from "./utils/pageGenerate"
import { render } from "./utils/renderDom"
import Block from './modules/block/Block'

// Получение значения текущей страницы через GET переменную page
const pageName:string = getPageNameFromUrl('page')


// Генерация страниц с использованием шаблонов
const result:Block = pageName ? generatePage(pageName) : generatePage('404')

// Вывод сгенерированного кода в блок #main
render("#main", result)
