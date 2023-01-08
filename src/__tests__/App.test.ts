/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import App from "../App.svelte"
import { render } from "@testing-library/svelte";

describe("Test home page loads", () => {
    test("Title is Query DNS records", () => {
        const app = render(App);
        expect(app.getByText("Query DNS records")).toBeInTheDocument();
    });
});