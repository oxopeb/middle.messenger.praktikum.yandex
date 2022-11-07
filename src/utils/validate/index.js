export function validate(value, element) {

   switch (element) {
      case "first_name":
      case "second_name":
         return !value.match(/^[A-ZА-Я]/g) ? 'С заглавной буквы!' :
            (value.match(/\d+/g) ? 'Нет цифр' :
               (value.match(/\s/g) ? 'Не нужно пробелов' :
                  (!value.match(/^[a-zA-ZА-Яа-я0-9-]{0,}$/g) ? 'Не нужно спец.символов' : false)))
         break
      case "login":
         return value.length === 0 ? 'Не должно быть пустым' : (!value.match(/^[a-zA-Z0-9-_]{3,20}$/g) ?
            'Не нужно спец.символов, только лаnиница, от 3 до 20 символов' :
            (value.match(/\s/g) ? 'Не нужно пробелов' : false))
         break
      case "email":
         return !value.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i) ? 'Только латиница, нужен знак @ и домен' :
            (value.match(/\s/g) ? 'Не нужно пробелов' : false)
      case "password":
      case "password_repeat":
         return value.length === 0 ? 'Не должно быть пустым' : (!value.match(/^.*(?=.{8,40})(?=.*[A-Z])(?=.*\d).*$/) ?
            '8-40 смиволов, заглавная буква и цифра' : false)
      case "phone":
         return !value.match(/^\+?(\d{1-3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/) ? '10-15 смиволов' : false
         break
      case "message":
         return value.length === 0 ? 'Не должно быть пустым' : false
      default: return false
   }
}

export function validateInput(element) {
   const name = element.name
   const value = element.value
   return validate(value, name)
}

export function validateInputBlock (HTMLelement) {
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

export function validateInputForm(inputs) {
   let totalInfo = ''
   for (target in inputs){
      const HTMLelement = inputs[target]
      const result = validateInput(HTMLelement)
      if (result) {
         console.log(target, result)
         HTMLelement.title = result
         HTMLelement.classList.add('error')
      }
      else {
         HTMLelement.title = target
         HTMLelement.classList.remove('error')
         totalInfo+=`{ ${target}=${HTMLelement.value}  }`
      }
   }
   console.log("Форма:",totalInfo)
} 