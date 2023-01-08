/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import App from "../App.svelte"
import { render } from "@testing-library/svelte";

describe("Test home page", () => {
    test("Title is Query DNS records", () => {
        const { getByText } = render(App);
        expect(getByText("Query DNS records")).toBeInTheDocument();
    });
});