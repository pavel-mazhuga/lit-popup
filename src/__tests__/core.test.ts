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

describe('lit-popup inits properly', () => {
    it('throws when no DOM element found', () => {
        element.remove();
        expect(() => new LitPopup(name)).toThrow(withPrefix('Element not found.'));
    });

    it('inits properly', () => {
        (LitPopup.prototype as any).init = jest.fn();

        const openButton = document.createElement('button');
        openButton.dataset.litPopupOpen = name;
        document.body.appendChild(openButton);

        const closeButton = document.createElement('button');
        closeButton.dataset.litPopupClose = name;
        document.body.appendChild(closeButton);

        const instance = new LitPopup(name);

        expect((instance as any).init).toHaveBeenCalledTimes(1);
        expect(instance.el).toEqual(element);
        expect(instance.isOpen).toEqual(false);
        expect(instance.innerContainer).toBeNull();
        expect((instance as any).openButtons.length).toEqual(1);
        expect((instance as any).closeButtons.length).toEqual(1);
    });
});
