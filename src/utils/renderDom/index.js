// export function render(element, content):void {
//     console.log(element)
//     console.log(content)
//     document.getElementById(element).innerHTML = content;
// }

export function render(query, block){
    const root = document.querySelector(query)
    console.log("render", block.getContent())
    root.appendChild(block.getContent())
    //root.textContent = block
    block.dispatchComponentDidMount

    return root
}
