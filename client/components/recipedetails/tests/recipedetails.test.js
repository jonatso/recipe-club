/**
 * @jest-environment jsdom
 */

import RecipeDetails from "..";
import renderer from "react-test-renderer";
import React from "react";
import dummyRecipes from "../../../helpers/dummydata";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

test("render", () => {
   const tree = renderer
      .create(<RecipeDetails recipe={dummyRecipes[0]} />)
      .toJSON();
   expect(tree).toMatchSnapshot();
});

test("header, ingredients exist", () => {
   const { getByTestId } = render(<RecipeDetails recipe={dummyRecipes[0]} />);
   const container = getByTestId("container");
   const header = getByTestId("header");
   const ingredients = getByTestId("ingredient-table");
   expect(container).toContainElement(header);
   expect(container).toContainElement(ingredients);
});

test("clicking increment portions", () => {
   const { getByTestId } = render(<RecipeDetails recipe={dummyRecipes[0]} />);
   expect(getByTestId("portions-text"));
   userEvent.click(getByTestId("increment-portions"));
   expect(getByTestId("portions-text")).toBeInTheDocument();
});
