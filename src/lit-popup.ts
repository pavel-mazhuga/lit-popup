import { withPrefix, triggerCustomEvent, listenOnce } from './utils';
import events from './events';
import classes from './classes';
import keydown from './plugins/keydown';
import { LitPopupOptions, LitPopupInterface, Plugin, PluginDestroyer, EventOptions, Listener } from './types';

const defaultOptions: LitPopupOptions = {
    plugins: [],
    innerContainerSelector: '.lit-popup-container',
    onOpen: () => {},
    openAnimation: () => new Promise(resolve => resolve()),
    onOpenComplete: () => {},
    onClose: () => {},
    closeAnimation: () => new Promise(resolve => resolve()),
    onCloseComplete: () => {},
    onDestroy: () => {},
};

export { events };

export default class LitPopup implements LitPopupInterface {
    private options: LitPopupOptions;
    public isOpen: boolean;
    public el: Element;
    public innerContainer: Element | null;
    private openButtons: Element[];
    private closeButtons: Element[];
    private plugins: Plugin[];
    private pluginDestroyers: PluginDestroyer[];
    public previousActiveElement: Element | null;
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
        this.openButtons = Array.from(document.querySelectorAll(`[data-lit-popup-open="${name}"]`));
        this.closeButtons = Array.from(document.querySelectorAll(`[data-lit-popup-close="${name}"]`));
        this.plugins = [keydown, ...this.options.plugins];
        this.pluginDestroyers = [];
        this.previousActiveElement = null;

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.init();
    }

    private init(): void {
        this.openButtons.forEach(btn => btn.addEventListener('click', this.open));
        this.closeButtons.forEach(btn => btn.addEventListener('click', this.close));
        this.pluginDestroyers = this.plugins.map(plugin => plugin(this));
    }

    public destroy(): void {
        this.options.onDestroy(this);
        this.trigger(events.DESTROY);
        this.openButtons.forEach(btn => btn.removeEventListener('click', this.open));
        this.closeButtons.forEach(btn => btn.removeEventListener('click', this.close));
        this.pluginDestroyers.forEach(fn => fn());
        this.listeners.forEach(([eventName, fn]) => this.off(eventName, fn));
        this.listeners = [];
        this.isOpen = false;
        (this.el as unknown) = null;
        this.innerContainer = null;
        (this.openButtons as unknown) = [];
        (this.closeButtons as unknown) = [];
        this.previousActiveElement = null;
    }

    public on(eventName: string, fn: EventListener) {
        if (eventName === 'destroy') {
            this.one(eventName, fn);
        } else {
            this.el.addEventListener(eventName, fn);
            this.listeners.push([eventName, fn]);
        }
    }

    public one(eventName: string, fn: EventListener): void {
        listenOnce(this.el, eventName, fn);
    }

    public off(eventName: string, fn: EventListener): void {
        this.el.removeEventListener(eventName, fn);
    }

    public trigger(eventName: string, options?: EventOptions): void {
        triggerCustomEvent(this.el, eventName, options);
    }

    public async open(): Promise<void> {
        const firstFocusableElement: HTMLElement | null = this.el.querySelector(':not([disabled])');
        this.previousActiveElement = document.activeElement;

        if (firstFocusableElement) {
            firstFocusableElement.focus();
        }

        this.isOpen = true;
        this.el.classList.add(classes.OPENED, classes.IS_OPENING);
        this.options.onOpen(this);
        this.trigger(events.OPEN);

        await this.options.openAnimation(this);

        this.el.classList.remove(classes.IS_OPENING);
        this.options.onOpenComplete(this);
        this.trigger(events.OPEN_COMPLETE);
    }

    public async close(): Promise<void> {
        this.el.classList.add(classes.IS_CLOSING);
        this.options.onClose(this);
        this.trigger(events.CLOSE);

        await this.options.closeAnimation(this);

        this.isOpen = false;
        this.el.classList.remove(classes.IS_CLOSING, classes.OPENED);

        if (this.innerContainer && this.innerContainer.scrollTo) {
            this.innerContainer.scrollTo(0, 0);
        }

        if (this.previousActiveElement instanceof HTMLElement) {
            this.previousActiveElement.focus();
        }

        this.options.onCloseComplete(this);
        this.trigger(events.CLOSE_COMPLETE);
    }
}
