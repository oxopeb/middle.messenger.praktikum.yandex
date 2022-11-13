import Block from "../../modules/block/Block"

export function render(query:string, block:Block){
    const root:HTMLElement = document.querySelector(query) as HTMLElement
    root.appendChild(block.getContent())
    block.dispatchComponentDidMount
    //return root
}
