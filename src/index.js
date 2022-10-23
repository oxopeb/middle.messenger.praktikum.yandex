import './style.scss'

// Компоненты
import buttonComponent from './components/button'
import inputComponent from './components/input'

// Модули
import getPageNameFromUrl from "./utils/routing"
import { render, generatePage } from "./utils/pageGenerate"

// Получение значения текущей страницы через GET переменную page
const pageName = getPageNameFromUrl('page')

// Генерация страниц с использованием шаблонов и вывода сгенерированного кода в блок #main
const result = pageName?generatePage(pageName):generatePage('404')

// Вывод сгенерированного кода в блок #main
render('main', result)
