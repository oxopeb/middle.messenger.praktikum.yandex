class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element = null;
  _meta = null;

  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };
    this.props = this._makePropsProxy(props);
    console.log("New object tagName", tagName);
    console.log("New object props", this.props);

    this.eventBus = () => eventBus;

    //console.log("eventBus",this.eventBus);
    this._registerEvents(eventBus);
    console.warn("INIT event");
    eventBus.emit(Block.EVENTS.INIT);
    //console.warn("RENDERER event");
    //eventBus.emit(Block.EVENTS.FLOW_RENDER);
    console.warn("CDM event");
    eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    console.log("tagName", tagName)
    this._element = this._createDocumentElement(tagName);
    console.log("_element", this._element)
  }

  init() {
    console.log("initBlock");
    this._createResources();
    //this._componentDidUpdate.bind(this));
    //this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount(props) {
    this.componentDidMount(props);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {
    return;
  }

  dispatchComponentDidMount() {
    console.warn("componentDidMount");
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(props, nextProps) {
    console.log({ props, nextProps });
    const response = this.componentDidUpdate(props, nextProps);
    console.log("response", response);
    if (response) this._render;
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    console.log("componentDidUpdate");
    return !(oldProps === newProps);
  }
  dispatchComponentDidUpdate() {
    console.warn("componentDidUpdate");
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  }
  setProps = nextProps => {
    if (!nextProps) {
      return;
    }
    console.log("setProps", { nextProps });
    this.nextProps = nextProps;
    Object.assign(this.props, nextProps);
    return this._componentDidUpdate(this.props, nextProps);
    //this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    console.warn("RESULT in render", block);


    this._element.innerHTML = block;
  }

  // Может переопределять пользователь, необязательно трогать
  render() {


  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const checkPrivateProp = prop => prop.startsWith('_');
    props = new Proxy(props, {
      get(target, prop) {
        console.log("getProxy");
        if (checkPrivateProp(prop)) {
          throw new Error('Нет доступа');
        } else {
          const value = target[prop];
          console.log("value in ProxyGet", value);
          return (typeof value === 'function') ? value.bind(target) : value;
        }
      },
      set(target, prop, value) {
        console.log("setProxy");
        if (checkPrivateProp(prop)) {
          throw new Error("Нет доступа");
        } else {
          target[prop] = value;
          console.log("value in ProxyGet", target[prop]);
          return true;
        }
      },
      deleteProperty(target, prop) {
        console.log("delete Proxy");
        if (checkPrivateProp(prop)) {
          throw new Error("Нет доступа");
        } else {
          console.log("value to ProxyDelete", target[prop]);
          delete target[prop];
          return true;
        }
      },
    });

    return props;
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}