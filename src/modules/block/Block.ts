import { EventBus } from "../event-bus"
import { v4 as makeUUID } from "uuid"
import { compile as templateCompile } from '../../utils/templator'
import { TemplateDelegate } from "handlebars"

interface IEventBusList {
    (): EventBus;
}

type objectListener = {
    (event: Event): unknown;
};
export type EventsProp = {
    [k: string]: objectListener | objectListener[];
};

export interface IChildren<T> {
    [key: string]: T;
}

export interface IProps {
    [k: string]: unknown
    tagName?: string
    events?: EventsProp
    classes?: string
    name?: string
    title?: string
    link?: string
    class?: string
    input?: unknown
    settings?: {
        [k: string]: unknown
        withInternalID?: boolean
    };
}

interface IEventBusList {
    (): EventBus
}

export default class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    } as const

    protected _element!: HTMLElement
    protected _meta: { tagName: string; props: IProps }
    protected eventBus: IEventBusList;
    protected _id?: string
    private _className: string
    public props: IProps
    public children: IChildren<Block>

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(public propsAndChildren: IProps = {}, public tagName: string = "div") {
        const eventBus = new EventBus()
        const { children, props } = this._getChildren(propsAndChildren)

        this.children = this._makePropsProxy(children)

        this._meta = {
            tagName,
            props
        }

        this.props = this._makePropsProxy(props)
        const hasId = this.props.settings ? (this.props.settings.withInternalID ? true : false) : false
        if (hasId) {
            this._id = makeUUID()
            this.props = this._makePropsProxy({ ...props, __id: this._id })
        } else {
            this.props = this._makePropsProxy(props)
        }

        this._className = this.props.classes ? `${this.props.classes}` as string : 'basic'

        this.eventBus = () => eventBus

        this._registerEvents(eventBus)
        eventBus.emit(Block.EVENTS.INIT)
    }

    private _getChildren(propsAndChildren: IProps) {
        const children: IChildren<Block> = {};
        const props: IProps = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props }
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    }

    private _createResources() {
        const { tagName } = this._meta
        this._element = this._createDocumentElement(tagName)
        this._element.classList.add(this._className)
    }

    init() {
        this._createResources()
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }

    private _componentDidMount() {
        this.componentDidMount()
        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    }

    _componentDidUpdate(): void {
        if (this.componentDidUpdate())
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }

    componentDidUpdate(): boolean {
        return true
    }

    setProps(nextProps: IProps): void {
        if (!nextProps) {
            return
        }
        //this.nextProps = nextProps;
        Object.assign(this.props, nextProps)
    }

    get element() {
        return this._element
    }

    _render() {
        const block = this.render()
        this._element.innerHTML = ''
        if (block) this._element.appendChild(block)
        this._addEvents()
    }

    // Переопределяется пользователем. Необходимо вернуть разметку
    render(): HTMLElement {
        return this._createDocumentElement('div')
    }

    getContent() {
        return this.element
    }

    private _makePropsProxy<T extends IProps>(props: T) {
        return new Proxy(props, {
            get(target: T, prop: string): unknown {
                    const value = target[prop]
                    return (typeof value === 'function') ? value.bind(target) : value
            },
            set(target: T, prop: string, value: unknown): boolean {
                    target[prop] = value
                    return true;

            },
            deleteProperty(target: T, prop: string): boolean {
                if (prop.indexOf('_') === 0) {
                    throw new Error('Access denied')
                } else {
                    delete target[prop];
                    return true
                }
            },
        });
    }

    compile(template: TemplateDelegate, props: IProps) {
        const propsAndStubs: IProps = { ...props }
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        })
        const fragment = document.createElement('template')
        fragment.innerHTML = templateCompile(template, propsAndStubs)
        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
            if (!stub) return
            stub.replaceWith(child.getContent())
        })
        return fragment.content;
    }

    private _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        const element = document.createElement(tagName)
        if (this._id) {
            element.setAttribute('data-id', this._id)
        }
        return element
    }

    private _addEvents() {
        const { events } = this.props;
        if (!events) {
            return
        }

        Object.entries(events).forEach(([eventName, arrayOrHandler]) => {
            [arrayOrHandler].flat().forEach((eventHandler) => {
                if (typeof eventHandler === 'function') {
                    this._element.addEventListener(eventName, eventHandler)
                }
            })
        })
    }

    private _removeEvents() {
        const { events } = this.props.events

        if (!events || !this._element) {
            return
        }
        Object.entries(events).forEach(([eventName, arrayOrHandler]) => {
            [arrayOrHandler].flat().forEach((eventHandler) => {
                if (typeof eventHandler === 'function') {
                    this._element.removeEventListener(eventName, eventHandler)
                }
            })
        })
    }

    show() {
        this.getContent().style.display = "block"
    }

    hide() {
        this.getContent().style.display = "none"
    }
}

