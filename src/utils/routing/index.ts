export default function getQueryVariable(varToFindInURL:string):string {
    const query:string = window.location.search.substring(1)
    const blocks:string[] = query.split("&")
    let valueReceived = 'base'
    blocks.forEach (block => {
        const pair = block.split("=")
        if (pair[0] === varToFindInURL) { 
            valueReceived = pair[1]
        }
    });
    return valueReceived
}