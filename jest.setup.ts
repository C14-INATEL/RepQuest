/// <reference types="jest" />

jest.mock('react-native/src/private/animated/NativeAnimatedHelper');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native/Libraries/Modal/Modal', () => {
  const React = require('react');
  const MockModal = ({ children, visible }: { children: unknown; visible: boolean }) =>
    visible ? React.createElement(React.Fragment, null, children) : null;

  return {
    __esModule: true,
    default: MockModal,
  };
});
