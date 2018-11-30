var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
describe('App snapshot', () => {
    jest.useFakeTimers();
    beforeEach(() => {
        NavigationTestUtils.resetInternalState();
    });
    it('renders the loading screen', () => __awaiter(this, void 0, void 0, function* () {
        const tree = renderer.create(React.createElement(App, null)).toJSON();
        expect(tree).toMatchSnapshot();
    }));
    it('renders the root without loading screen', () => __awaiter(this, void 0, void 0, function* () {
        const tree = renderer.create(React.createElement(App, { skipLoadingScreen: true })).toJSON();
        expect(tree).toMatchSnapshot();
    }));
});
//# sourceMappingURL=App-test.js.map