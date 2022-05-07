
export class DefaultRoot implements ShadowRoot {

    private _element: Element;
    constructor(element: Element) {
        this._element = element;
    }
    querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K];
    querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K];
    querySelector<E extends Element = Element>(selectors: string): E;
    querySelector(selectors: any): any {
        return this._element.querySelector(selectors);
    }
    querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
    querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
    querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
    querySelectorAll(selectors: any): any {
        return this._element.querySelectorAll(selectors);
    }
    delegatesFocus: boolean;
    host: Element;
    mode: ShadowRootMode;
    ownerDocument: Document;
    getElementById(elementId: string): HTMLElement {
        return document.getElementById(elementId);
    }
    baseURI: string;
    childNodes: NodeListOf<ChildNode>;
    firstChild: ChildNode;
    isConnected: boolean;
    lastChild: ChildNode;
    nextSibling: ChildNode;
    nodeName: string;
    nodeType: number;
    nodeValue: string;
    parentElement: HTMLElement;
    parentNode: ParentNode;
    previousSibling: ChildNode;
    textContent: string;
    appendChild<T extends Node>(node: T): T {
        return this._element.appendChild(node);
    }
    cloneNode(deep?: boolean): Node {
        throw new Error('Method not implemented.');
    }
    compareDocumentPosition(other: Node): number {
        throw new Error('Method not implemented.');
    }
    contains(other: Node): boolean {
        return this._element.contains(other);
    }
    getRootNode(options?: GetRootNodeOptions): Node {
        return this._element.getRootNode(options);
    }
    hasChildNodes(): boolean {
        return this._element.hasChildNodes();
    }
    insertBefore<T extends Node>(node: T, child: Node): T {
        throw new Error('Method not implemented.');
    }
    isDefaultNamespace(namespace: string): boolean {
        throw new Error('Method not implemented.');
    }
    isEqualNode(otherNode: Node): boolean {
        throw new Error('Method not implemented.');
    }
    isSameNode(otherNode: Node): boolean {
        throw new Error('Method not implemented.');
    }
    lookupNamespaceURI(prefix: string): string {
        throw new Error('Method not implemented.');
    }
    lookupPrefix(namespace: string): string {
        throw new Error('Method not implemented.');
    }
    normalize(): void {
        throw new Error('Method not implemented.');
    }
    removeChild<T extends Node>(child: T): T {
        throw new Error('Method not implemented.');
    }
    replaceChild<T extends Node>(node: Node, child: T): T {
        throw new Error('Method not implemented.');
    }
    ATTRIBUTE_NODE: number;
    CDATA_SECTION_NODE: number;
    COMMENT_NODE: number;
    DOCUMENT_FRAGMENT_NODE: number;
    DOCUMENT_NODE: number;
    DOCUMENT_POSITION_CONTAINED_BY: number;
    DOCUMENT_POSITION_CONTAINS: number;
    DOCUMENT_POSITION_DISCONNECTED: number;
    DOCUMENT_POSITION_FOLLOWING: number;
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
    DOCUMENT_POSITION_PRECEDING: number;
    DOCUMENT_TYPE_NODE: number;
    ELEMENT_NODE: number;
    ENTITY_NODE: number;
    ENTITY_REFERENCE_NODE: number;
    NOTATION_NODE: number;
    PROCESSING_INSTRUCTION_NODE: number;
    TEXT_NODE: number;
    addEventListener(type: string, callback: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
        throw new Error('Method not implemented.');
    }
    dispatchEvent(event: Event): boolean {
        throw new Error('Method not implemented.');
    }
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void {
        throw new Error('Method not implemented.');
    }
    childElementCount: number;
    children: HTMLCollection;
    firstElementChild: Element;
    lastElementChild: Element;
    append(...nodes: (string | Node)[]): void {
        this._element.append(...nodes);
    }
    prepend(...nodes: (string | Node)[]): void {
        this._element.prepend(...nodes);
    }


    replaceChildren(...nodes: (string | Node)[]): void {
        throw new Error('Method not implemented.');
    }
    activeElement: Element;
    fullscreenElement: Element;
    pictureInPictureElement: Element;
    pointerLockElement: Element;
    styleSheets: StyleSheetList;
    elementFromPoint(x: number, y: number): Element {
        throw new Error('Method not implemented.');
    }
    elementsFromPoint(x: number, y: number): Element[] {
        throw new Error('Method not implemented.');
    }
    getAnimations(): Animation[] {
        throw new Error('Method not implemented.');
    }

    get innerHTML(): string {
        return this._element.innerHTML;
    }

    set innerHTML(value) {
        this._element.innerHTML = value;
    }
}
