import { sortPages } from "./report.js";
import { test, expect } from "@jest/globals";

test("sortpages", () => {
    const input = {
        'https://google.com/about': 1,
        'https://google.com': 3
    };
    const actual = sortPages(input);
    const expected = [
        ['https://google.com', 3],
        ['https://google.com/about', 1]]
    expect(actual).toEqual(expected);
});
