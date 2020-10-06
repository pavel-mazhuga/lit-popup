/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
export default function delegate(elements: Document | Element | string, selector: string, type: string, callback: Function, useCapture?: boolean): {
    destroy: () => void;
} | unknown[];
