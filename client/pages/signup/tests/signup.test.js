/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import SignupCard from '..';
 import { render, screen } from "@testing-library/react";
 import "@testing-library/jest-dom";
 
 test('2 + 2 er 4', () => {
     expect(2 + 2).toBe(4);
 });
 
     test("elements exist", () => {
         const {getByTestId} = render(<SignupCard />);
         const container = getByTestId("signupContainer");
         const firstNameField = getByTestId("firstName");
         const lastNameField = getByTestId("lastName");
         const emailField = getByTestId("email");
         const passwordButton = getByTestId("passwordButton");
         const signupButton = getByTestId("signupButton");
         const passwordField = getByTestId("password");
         const loginText = getByTestId("loginText");
         expect(container).toContainElement(firstNameField);
         expect(container).toContainElement(lastNameField);
         expect(container).toContainElement(emailField);
         expect(container).toContainElement(passwordButton);
         expect(container).toContainElement(signupButton);
         expect(container).toContainElement(passwordField);
         expect(container).toContainElement(loginText);
     });

     test("elements are initially empty", () => {
        const {getByTestId} = render(<SignupCard />);
        const firstNameField = getByTestId("firstName");
        expect(firstNameField).toHaveValue("");
     });
 
     test("password is initially hidden", () => {
        const {getByTestId} = render(<SignupCard />);
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


     