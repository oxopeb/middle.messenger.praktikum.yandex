import Block from "../../modules/block/Block"

export function render(query:string, block:Block):HTMLElement{
    const root:HTMLElement = document.querySelector(query)
    root.appendChild(block.getContent())
    block.dispatchComponentDidMount

    return root
}
