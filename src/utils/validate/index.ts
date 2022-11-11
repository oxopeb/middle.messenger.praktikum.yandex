export function validate(value: string, element: string): string {

   switch (element) {
      case "first_name":
      case "second_name":
         return !value.match(/^[A-ZА-Я]/g) ? 'С заглавной буквы!' :
            (value.match(/\d+/g) ? 'Нет цифр' :
               (value.match(/\s/g) ? 'Не нужно пробелов' :
                  (!value.match(/^[a-zA-ZА-Яа-я0-9-]{0,}$/g) ? 'Не нужно спец.символов' : 'ok')))
         break
      case "login":
         return value.length === 0 ? 'Не должно быть пустым' : (!value.match(/^[a-zA-Z0-9-_]{3,20}$/g) ?
            'Не нужно спец.символов, только лаnиница, от 3 до 20 символов' :
            (value.match(/\s/g) ? 'Не нужно пробелов' : 'ok'))
         break
      case "email":
         return !value.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i) ? 'Только латиница, нужен знак @ и домен' :
            (value.match(/\s/g) ? 'Не нужно пробелов' : 'ok')
      case "password":
      case "password_repeat":
         return value.length === 0 ? 'Не должно быть пустым' : (!value.match(/^.*(?=.{8,40})(?=.*[A-Z])(?=.*\d).*$/) ?
            '8-40 смиволов, заглавная буква и цифра' : 'ok')
      case "phone":
         return !value.match(/^\+?(\d{1-3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/) ? '10-15 смиволов' : 'ok'
         break
      case "message":
         return value.length === 0 ? 'Не должно быть пустым' : 'ok'
      default: return 'ok'
   }
}

export function validateInput(element: HTMLInputElement): string {
   const name: string = element.name
   const value: string = element.value
   return validate(value, name)
}

export function validateInputBlock(HTMLelement: HTMLInputElement): void {
   const result = validateInput(HTMLelement)
   if (result) {
      console.log(HTMLelement.name, result)
      HTMLelement.title = result
      HTMLelement.classList.add('error')
   }
   else {
      HTMLelement.title = HTMLelement.name
      HTMLelement.classList.remove('error')
   }
}
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

export function validateInputForm(inputs: IInputsObject): void {
   let totalInfo = ''
   Object.entries(inputs).forEach(([key, value]) => {
      const HTMLelement: HTMLInputElement = value
      const result: string = validateInput(HTMLelement)
      if (result) {
         console.log(key, result)
         HTMLelement.title = result
         HTMLelement.classList.add('error')
      }
      else {
         HTMLelement.title = key
         HTMLelement.classList.remove('error')
         totalInfo += `{ ${key}=${HTMLelement.value}  }`
      }
   })
   console.log("Форма:", totalInfo)
} 