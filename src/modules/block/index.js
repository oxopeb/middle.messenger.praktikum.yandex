import { EventBus } from "../event-bus"
import { v4 as makeUUID } from "uuid"
import { compile as templateCompile } from '/src/utils/templator'


class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    _element = null;
    _meta = null

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(propsAndChildren = {}, tagName = "div") {
        const eventBus = new EventBus()
        const { children, props } = this._getChildren(propsAndChildren)

        this.children = children

        this._meta = {
            tagName,
            props
        }

        if (props.settings && props.settings.withInternalID) {
            this._id = makeUUID()
            props.__id = this._id;
            console.log("_id", this._id)
        }

        this.props = this._makePropsProxy(props)
        this._className = this.props.classes ? this.props.classes:'basic'
        
        this.eventBus = () => eventBus

        this._registerEvents(eventBus)
        eventBus.emit(Block.EVENTS.INIT)
    }

    _getChildren(propsAndChildren) {
        const children = {}
        const props = {}

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props }
    }

    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    }

    _createResources() {
        const { tagName } = this._meta
        this._element = this._createDocumentElement(tagName)
        this._element.classList.add(this._className)
    }

    init() {
        this._createResources()
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }

    _componentDidMount() {
        this.componentDidMount()
        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount(oldProps) {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM)
    }

    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps)
        if (!response) { return; } this._render();
    }

    componentDidUpdate(oldProps, newProps) {
        return true
    }

    setProps = nextProps => {
        if (!nextProps) {
            return
        }
        this.nextProps = nextProps;
        Object.assign(this.props, nextProps)
    };

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
    render() { }

    getContent() {
        return this.element
    }

    _makePropsProxy(props) {
        const self = this;
        const checkPrivateProp = prop => prop.startsWith('_')
        props = new Proxy(props, {
            get(target, prop) {
                    const value = target[prop]
                    return (typeof value === 'function') ? value.bind(target) : value
                //}
            },
            set(target, prop, value) {
                    target[prop] = value
                    return true;
                //}
            },
            deleteProperty(target, prop) {
                throw new Error("Нет прав")
            },
        });

        return props
    }

    compile(template, props) {
        const propsAndStubs = { ...props }

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

    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        const element = document.createElement(tagName)
        if (this._id) {
            element.setAttribute('data-id', this._id)
        }
        return element
    }

    _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach(eventName => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        console.log("element:", this._element)
        const events = this.props.events

        if (!events || !this._element) {
            return
        }
        for (const eventName of Object.keys(events)) {
            events[eventName].forEach((event) => {
                event.remove();
            });
        }
    }

    show() {
        this.getContent().style.display = "block"
    }

    hide() {
        this.getContent().style.display = "none"
    }
}

export default Block