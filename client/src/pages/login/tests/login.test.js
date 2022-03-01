/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import Register from '..';
 import { render } from "@testing-library/react";
 import "@testing-library/jest-dom";
 
 test('2 + 2 er 4', () => {
     expect(2 + 2).toBe(4);
 });
 
     test("elements exist", () => {
         const {getByTestId} = render(<Register />);
         const container = getByTestId("loginContainer");
         const emailField = getByTestId("email");
         const passwordField = getByTestId("password");
         const loginButton = getByTestId("login");
         expect(container).toContainElement(emailField);
         expect(container).toContainElement(loginButton);
     });