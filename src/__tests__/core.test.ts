import LitPopup from '../lit-popup';
import { withPrefix } from '../utils';

const name = 'test';
const element = document.createElement('div');
element.dataset.litPopup = name;

beforeEach(() => {
    document.body.appendChild(element);
});

afterEach(() => {
    document.body.innerHTML = '';
});

describe('throwing errors', () => {
    it('throws when no DOM element found', () => {
        element.remove();
        expect(() => new LitPopup(name)).toThrow(withPrefix('Element not found.'));
    });
});

describe('state', () => {
    it('"isOpen" property should be set to true when popup is opened', () => {
        const instance = new LitPopup(name);
        instance.open();

        expect(instance.isOpen).toEqual(true);
    });

    it('"isOpen" property should be set to false when popup is closed', () => {
        const instance = new LitPopup(name);
        instance.close();

        expect(instance.isOpen).toEqual(false);
    });
});

describe('Openers/closers HTML elements event listeners', () => {
    it('adds event listeners to opener/closers HTML elements', () => {
        const openBtn = document.createElement('button');
        openBtn.dataset.litPopupOpen = name;
        document.body.appendChild(openBtn);

        const closeBtn = document.createElement('button');
        closeBtn.dataset.litPopupClose = name;
        document.body.appendChild(closeBtn);

        const openBtnAdder = jest.spyOn(openBtn, 'addEventListener').mockImplementation(() => {});
        const closeBtnAdder = jest.spyOn(closeBtn, 'addEventListener').mockImplementation(() => {});
        const instance = new LitPopup(name);

        expect(openBtnAdder).toHaveBeenCalledTimes(1);
        expect(closeBtnAdder).toHaveBeenCalledTimes(1);
    });
});

describe('hooks', () => {
    it('calls "onOpen" hook when popup opens', () => {
        const onOpen = jest.fn();
        const instance = new LitPopup(name, { onOpen });

        instance.open();

        expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('calls "onOpenComplete" hook when popup finishes opening', async () => {
        const onOpenComplete = jest.fn();
        const instance = new LitPopup(name, { onOpenComplete });

        await instance.open();

        expect(onOpenComplete).toHaveBeenCalledTimes(1);
    });

    it('calls "onClose" hook when popup closes', () => {
        const onClose = jest.fn();
        const instance = new LitPopup(name, { onClose });

        instance.close();

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls "onCloseComplete" hook when popup finishes closing', async () => {
        const onCloseComplete = jest.fn();
        const instance = new LitPopup(name, { onCloseComplete });

        await instance.close();

        expect(onCloseComplete).toHaveBeenCalledTimes(1);
    });

    it('calls "onDestroy" hook when instance is being destroyed', () => {
        const onDestroy = jest.fn();
        const instance = new LitPopup(name, { onDestroy });

        instance.destroy();

        expect(onDestroy).toHaveBeenCalledTimes(1);
    });
});

describe('events', () => {
    it('triggers "open" event when popup opens', () => {
        const onOpen = jest.fn();
        const instance = new LitPopup(name);
        instance.on('open', onOpen);
        instance.open();

        expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('triggers "open-complete" event when popup finishes opening', async () => {
        const onOpenComplete = jest.fn();
        const instance = new LitPopup(name);
        instance.on('open-complete', onOpenComplete);
        await instance.open();

        expect(onOpenComplete).toHaveBeenCalledTimes(1);
    });

    it('triggers "close" event when popup closes', async () => {
        const onClose = jest.fn();
        const instance = new LitPopup(name);
        instance.on('close', onClose);
        await instance.open();
        instance.close();

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('triggers "close-complete" event when popup finishes closing', async () => {
        const onCloseComplete = jest.fn();
        const instance = new LitPopup(name);
        instance.on('close-complete', onCloseComplete);
        await instance.open();
        await instance.close();

        expect(onCloseComplete).toHaveBeenCalledTimes(1);
    });

    it('triggers "destroy" event when instance is being destroyed', () => {
        const onDestroy = jest.fn();
        const instance = new LitPopup(name);
        instance.on('destroy', onDestroy);
        instance.destroy();

        expect(onDestroy).toHaveBeenCalledTimes(1);
    });
});

describe('destroy', () => {
    it('clear all event listeners before destroying', () => {
        const onOpen = jest.fn();
        const onClose = jest.fn();
        const instance = new LitPopup(name);
        instance.on('open', onOpen);
        instance.on('close', onClose);
        const remover = jest.spyOn(instance.el, 'removeEventListener').mockImplementation(() => {});
        instance.destroy();

        // Two more calls come from "keydown" plugin
        expect(remover).toHaveBeenCalledTimes(4);
    });

    it('clear all event listeners from opener/closers HTML elements', () => {
        const openBtn = document.createElement('button');
        openBtn.dataset.litPopupOpen = name;
        document.body.appendChild(openBtn);

        const closeBtn = document.createElement('button');
        closeBtn.dataset.litPopupClose = name;
        document.body.appendChild(closeBtn);

        const instance = new LitPopup(name);
        const openBtnRemover = jest.spyOn(openBtn, 'removeEventListener').mockImplementation(() => {});
        const closeBtnRemover = jest.spyOn(closeBtn, 'removeEventListener').mockImplementation(() => {});
        instance.destroy();

        expect(openBtnRemover).toHaveBeenCalledTimes(1);
        expect(closeBtnRemover).toHaveBeenCalledTimes(1);
    });
});
