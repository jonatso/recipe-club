/**
 * @jest-environment jsdom
 */

import React from 'react';
import LoginCard from '..';
import renderer from 'react-test-renderer';
//import Link from '../Link'; 
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

//const loginIndex = require("../login");

test('2 + 2 er 4', () => {
    expect(2 + 2).toBe(4);
});

/* test('checks checkbox', () => {
    const component = shallow(
        <Foo
             />
    ) //her må jeg tilpasse til egen test

    expect(component
        .find('input[type="checkbox"][checked="checked"]'))
        .toHaveLength(content.length);
});

component
    .find('input')
    .forEach(node => {
        expect(node
            .props()
            .checked)
            .toEqual(true);
    }); */

    // test("email input field exists", () => {
    //     const emailField = getByTestId("email");
    //     expect(emailField).toBe(true);
    // });

    test("login container exists", () => {
        const {getByTestId} = render(<LoginCard />);
        const container = getByTestId("loginContainer");
        const emailField = getByTestId("email");
        expect(container).toContainElement(emailField);
    });