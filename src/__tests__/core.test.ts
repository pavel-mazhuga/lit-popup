import LitPopup from '../index';
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

// describe('Openers/closers HTML elements event listeners', () => {
//     it('adds event listeners to opener/closers HTML elements', () => {
//         const openBtn = document.createElement('button');
//         openBtn.dataset.litPopupOpen = name;
//         document.body.appendChild(openBtn);

//         const closeBtn = document.createElement('button');
//         closeBtn.dataset.litPopupClose = name;
//         document.body.appendChild(closeBtn);

//         const instance = new LitPopup(name);
//         const openSpy = jest.spyOn(instance, 'open').mockImplementation(async () => {});
//         const closeSpy = jest.spyOn(instance, 'close').mockImplementation(async () => {});
//         openBtn.click();
//         closeBtn.click();

//         expect(openSpy).toHaveBeenCalledTimes(1);
//         expect(closeSpy).toHaveBeenCalledTimes(1);
//     });
// });

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

    // it('has "triggerElement" argument, if open/close button was clicked', () => {
    //     const openBtn = document.createElement('button');
    //     openBtn.dataset.litPopupOpen = name;
    //     document.body.appendChild(openBtn);

    //     const instance = new LitPopup(name);
    //     // const openBtnAdder = jest.spyOn(instance, 'onOpen').mockImplementation(() => {});
    //     const openBtnAdder = jest.spyOn(instance, 'onOpen');

    //     openBtn.click();

    //     expect(openBtnAdder).toHaveBeenCalledWith();
    // });
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

describe.skip('Inert', () => {
    it('inerts all siblings when popup opens and restores it when closes', () => {
        const instance = new LitPopup(name);

        const prevDiv = document.createElement('div');
        document.body.prepend(prevDiv);
        const nextDiv = document.createElement('div');
        document.body.append(nextDiv);
        const ignoredDiv = document.createElement('div');
        ignoredDiv.setAttribute('data-lit-popup-ignore-inert', '');
        document.body.append(ignoredDiv);

        instance.open();

        expect((prevDiv as any).inert).toEqual(true);
        expect((nextDiv as any).inert).toEqual(true);
        expect((ignoredDiv as any).inert).toBeFalsy();

        instance.close();

        expect((prevDiv as any).inert).toEqual(false);
        expect((nextDiv as any).inert).toEqual(false);
        expect((ignoredDiv as any).inert).toBeFalsy();
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
        const openBtnAdder = jest.spyOn(instance, 'open').mockImplementation(async () => {});
        const closeBtnAdder = jest.spyOn(instance, 'close').mockImplementation(async () => {});
        instance.destroy();

        expect(openBtnAdder).toHaveBeenCalledTimes(0);
        expect(closeBtnAdder).toHaveBeenCalledTimes(0);
    });
});
