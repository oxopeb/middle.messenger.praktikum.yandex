enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

function queryStringify(data: IRequest): string {
    const keys = Object.keys(data)
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`
    }, '?')
}

// interface IHeaders {
//     [k: string]: string
// }

interface IRequest {
    [k: string]: string
}

type Options = {
    method: METHOD
    data?: any
    headers?: any
    timeout?: number
}

export class HTTPTransport {
    get (url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
        return this.request(`${url}${queryStringify(options.data)}`, { ...options, method: METHOD.GET }, options.timeout)
    }
    put (url: string, options: Options = { method: METHOD.PUT }): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.PUT }, options.timeout)
    }
    post (url: string, options: Options = { method: METHOD.POST }): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.POST }, options.timeout)
    }
    delete (url: string, options: Options = { method: METHOD.DELETE }): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout)
    }
    request (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
        const { headers = {}, method, data} = options;
        return new Promise(function (resolve, reject) {
        if (!method) {
            reject("reject")
            return
        }
        const xhr: XMLHttpRequest = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.timeout = timeout
        Object.keys(headers).forEach(key => {

            xhr.setRequestHeader(key, headers[key])
        })
        xhr.onload = function () {
            resolve(xhr)
        }
        xhr.onabort = reject
        xhr.onerror = reject
        xhr.ontimeout = reject
        if (method === METHOD.GET || !data) {
            xhr.send()
        } else {
            xhr.send(data)
        }
    })
    }
}

