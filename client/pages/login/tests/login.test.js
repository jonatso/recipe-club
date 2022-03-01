/**
 * @jest-environment jsdom
 */

import React from 'react';
import LoginCard from '..';
import renderer from 'react-test-renderer';
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

test('2 + 2 er 4', () => {
    expect(2 + 2).toBe(4);
});

    test("elements exist", () => {
        const {getByTestId} = render(<LoginCard />);
        const container = getByTestId("loginContainer");
        const emailField = getByTestId("email");
        const checkbox = getByTestId("checkbox");
        const passwordField = getByTestId("password");
        expect(container).toContainElement(emailField);
        expect(container).toContainElement(checkbox);
        expect(container).toContainElement(passwordField);
    });

    