// import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

const noop = () => {};

Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
