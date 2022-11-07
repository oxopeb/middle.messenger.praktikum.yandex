export default function getQueryVariable(varToFindInURL) {
    const query = window.location.search.substring(1);
    const blocks = query.split("&");
    let valueReceived = 'base';
    blocks.forEach (block => {
        const pair = block.split("=");
        if (pair[0] === varToFindInURL) { 
            valueReceived = pair[1]; 
        }
    });
    return valueReceived;
}