import delegate from 'delegate';
import { withPrefix, triggerCustomEvent, listenOnce, events, classes } from './utils';
import keydown from './plugins/keydown';

export interface EventOptions {
    [key: string]: unknown;
}

export interface EventHandler {
    (eventName: string, fn: EventListener): void;
}

export interface LitPopupInterface {
    isOpen: boolean;
    el: Element;
    innerContainer: Element | null;
    previousActiveElement: Element | null;
    open: () => Promise<void>;
    close: () => Promise<void>;
    destroy: () => void;
    on: EventHandler;
    one: EventHandler;
    off: EventHandler;
    trigger: (eventName: string, options?: EventOptions) => void;
}

export interface LitPopupOptions {
    plugins: Plugin[];
    innerContainerSelector: string;
    onOpen: (instance: LitPopupInterface, triggerElement?: HTMLElement) => void;
    onOpenComplete: (instance: LitPopupInterface, triggerElement?: HTMLElement) => void;
    onClose: (instance: LitPopupInterface, triggerElement?: HTMLElement) => void;
    onCloseComplete: (instance: LitPopupInterface, triggerElement?: HTMLElement) => void;
    openAnimation: (instance: LitPopupInterface) => Promise<void>;
    closeAnimation: (instance: LitPopupInterface) => Promise<void>;
    onDestroy: (instance: LitPopupInterface) => void;
}

export interface PluginDestroyer {
    (): void;
}

export interface Plugin {
    (instance: LitPopupInterface): PluginDestroyer;
}

export type Listener = [string, EventListener];

const defaultOptions: LitPopupOptions = {
    plugins: [],
    innerContainerSelector: '.lit-popup-container',
    onOpen: () => {},
    openAnimation: () => Promise.resolve(),
    onOpenComplete: () => {},
    onClose: () => {},
    closeAnimation: () => Promise.resolve(),
    onCloseComplete: () => {},
    onDestroy: () => {},
};

export default class LitPopup implements LitPopupInterface {
    private options: LitPopupOptions;
    isOpen: boolean;
    el: Element;
    innerContainer: Element | null;
    openDelegation: any;
    closeDelegation: any;
    private plugins: Plugin[];
    private pluginDestroyers: PluginDestroyer[];
    previousActiveElement: Element | null;
    private listeners: Listener[];

    constructor(name: string, options: EventOptions = {}) {
        if (!name) {
            throw new Error(withPrefix('Expected a name as a first argument.'));
        }

        this.options = { ...defaultOptions, ...options };
        this.isOpen = false;
        const el = document.querySelector(`[data-lit-popup="${name}"]`);

        if (!el) {
            throw new Error(withPrefix('Element not found.'));
        }

        this.el = el;

        this.listeners = [];
        this.innerContainer = this.el.querySelector(this.options.innerContainerSelector);
        this.plugins = [keydown, ...this.options.plugins];
        this.pluginDestroyers = [];
        this.previousActiveElement = null;

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.init();
    }

    private init() {
        this.openDelegation = delegate(document, `[data-lit-popup-open="${name}"]`, 'click', this.open);
        this.closeDelegation = delegate(document, `[data-lit-popup-close="${name}"]`, 'click', this.close);
        this.pluginDestroyers = this.plugins.map(plugin => plugin(this));
    }

    destroy() {
        this.options.onDestroy(this);
        this.trigger(events.DESTROY);
        this.openDelegation.destroy();
        this.closeDelegation.destroy();
        this.pluginDestroyers.forEach(fn => fn());
        this.listeners.forEach(([eventName, fn]) => this.off(eventName, fn));
        this.listeners = [];
        this.isOpen = false;
        (this.el as unknown) = null;
        this.innerContainer = null;
        this.previousActiveElement = null;
    }

    on(eventName: string, fn: EventListener) {
        if (eventName === 'destroy') {
            this.one(eventName, fn);
        } else {
            this.el.addEventListener(eventName, fn);
            this.listeners.push([eventName, fn]);
        }
    }

    one(eventName: string, fn: EventListener) {
        listenOnce(this.el, eventName, fn);
    }

    off(eventName: string, fn: EventListener) {
        this.el.removeEventListener(eventName, fn);
    }

    trigger(eventName: string, options?: EventOptions) {
        triggerCustomEvent(this.el, eventName, options);
    }

    setOpenAnimation(fn: (instance: LitPopupInterface) => Promise<void>) {
        this.options.openAnimation = fn;
    }

    setCloseAnimation(fn: (instance: LitPopupInterface) => Promise<void>) {
        this.options.closeAnimation = fn;
    }

    async open(event?: Event) {
        if (event) {
            event.preventDefault();
        }
        // const firstFocusableElement: HTMLElement | null = this.el.querySelector(':not([disabled])');
        this.previousActiveElement = document.activeElement;

        // if (firstFocusableElement) {
        //     firstFocusableElement.focus();
        // }

        this.isOpen = true;
        this.el.classList.add(classes.OPENED, classes.IS_OPENING);
        this.options.onOpen(this, event ? (event.target as HTMLElement) : undefined);
        this.trigger(events.OPEN, { triggerElement: event ? (event.target as HTMLElement) : undefined });

        await this.options.openAnimation(this);

        this.el.classList.remove(classes.IS_OPENING);
        this.options.onOpenComplete(this, event ? (event.target as HTMLElement) : undefined);
        this.trigger(events.OPEN_COMPLETE, { triggerElement: event ? (event.target as HTMLElement) : undefined });
    }

    async close(event?: Event) {
        if (event) {
            event.preventDefault();
        }
        this.el.classList.add(classes.IS_CLOSING);
        this.options.onClose(this, event ? (event.target as HTMLElement) : undefined);
        this.trigger(events.CLOSE, { triggerElement: event ? (event.target as HTMLElement) : undefined });

        await this.options.closeAnimation(this);

        this.isOpen = false;
        this.el.classList.remove(classes.IS_CLOSING);
        this.el.classList.remove(classes.OPENED);

        if (this.innerContainer && this.innerContainer.scrollTo) {
            this.innerContainer.scrollTo(0, 0);
        }

        // if (this.previousActiveElement instanceof HTMLElement) {
        //     this.previousActiveElement.focus();
        //     this.previousActiveElement.classList.remove('focus-visible');
        // }

        this.options.onCloseComplete(this, event ? (event.target as HTMLElement) : undefined);
        this.trigger(events.CLOSE_COMPLETE, { triggerElement: event ? (event.target as HTMLElement) : undefined });
    }
}
