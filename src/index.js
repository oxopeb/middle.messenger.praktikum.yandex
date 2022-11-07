import './style.css'

// Компоненты

// Модули
import getPageNameFromUrl from "./utils/routing"
import { generatePage } from "./utils/pageGenerate"
import { render } from "./utils/renderDOM"

// Получение значения текущей страницы через GET переменную page
const pageName = getPageNameFromUrl('page')


// Генерация страниц с использованием шаблонов
const result = pageName ? generatePage(pageName) : generatePage('404')

// Вывод сгенерированного кода в блок #main
render("#main", result)
