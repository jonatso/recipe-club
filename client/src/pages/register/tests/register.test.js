/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import Register from '..';
 import { render, screen } from "@testing-library/react";
 import "@testing-library/jest-dom";
 
 test('2 + 2 er 4', () => {
     expect(2 + 2).toBe(4);
 });
 
     test("elements exist", () => {
         const {getByTestId} = render(<Register />);
         const container = getByTestId("signupContainer");
         const username = getByTestId("username");
         const emailField = getByTestId("email");
         const passwordButton = getByTestId("passwordButton");
         const signupButton = getByTestId("signupButton");
         const passwordField = getByTestId("password");
         const loginText = getByTestId("loginText");
         expect(container).toContainElement(username);
         expect(container).toContainElement(emailField);
         expect(container).toContainElement(passwordButton);
         expect(container).toContainElement(signupButton);
         expect(container).toContainElement(passwordField);
         expect(container).toContainElement(loginText);
     });

     test("elements are initially empty", () => {
        const {getByTestId} = render(<Register />);
        const firstNameField = getByTestId("firstName");
        expect(firstNameField).toHaveValue("");
     });
 
     test("password is initially hidden", () => {
        const {getByTestId} = render(<Register />);
        const passwordButton = getByTestId("passwordButton");
        const setText = screen.queryByText(/No ice cream will be delivered/i);
        
/*         const {getByTestId} = render(<SignupCard />);
        const button = getByTestId("button");
        const pressButton = button.simulate('click', {
            preventDefault: () => {}
          });
        expect(pressButton().state()).toEqual('input'); */


/*         const clickMock = jest.fn();
        const wrapper = mount(<SuperTest onClick={clickMock} />);
        const btn = wrapper.find("#passwordButton");
        if (btn) btn.simulate("click");
        expect(clickMock.mock.calls.length).toBe(1); */
     });

