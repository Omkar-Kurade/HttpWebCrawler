import { normalizeURL, getURLsFromHTML }  from "./crawl.js";
import { test, expect } from "@jest/globals";

test("normalizeURL stripe protocol", () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL stripe traling slash", () => {
    const input = "https://blog.boot.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
    const input = "https://BLOG.boot.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL stripe http", () => {
    const input = "http://blog.boot.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

// test("getURLsFromHTML", () => {
//     const inputHTMLBody = `
//     <html>
//     <body>
//      <a href="http://blog.boot.dev/path/">Blog Boot dev</a>
//     </body>
//     </html>
//     `;
//     const inputBaseURL = "http://blog.boot.dev/path/";
//     const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
//     const expected = ["http://blog.boot.dev/path/"];
//     expect(actual).toEqual(expected);
// });

// test("getURLsFromHTML relative", () => {
//     const inputHTMLBody = `
//     <html>
//     <body>
//      <a href="/path/">Blog Boot dev</a>
//     </body>
//     </html>
//     `;
//     const inputBaseURL = "/path/";
//     const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
//     const expected = ["http://blog.boot.dev/path/"];
//     expect(actual).toEqual(expected);
// });

// test("getURLsFromHTML both", () => {
//     const inputHTMLBody = `
//     <html>
//     <body>
//      <a href="/path2/">Blog Boot dev two</a>
//      <a href="http://blog.boot.dev/path1/">Blog Boot dev one</a>
//     </body>
//     </html>
//     `;
//     const inputBaseURL = "/path/";
//     const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
//     const expected = ["http://blog.boot.dev/path2/" , "http://blog.boot.dev/path1/"];
//     expect(actual).toEqual(expected);
// });


// test("getURLsFromHTML invalide", () => {
//     const inputHTMLBody = `
//     <html>
//     <body>
//      <a href="invalide">invalide</a>
//      
//     </body>
//     </html>
//     `;
//     const inputBaseURL = "/path/";
//     const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
//     const expected = [];
//     expect(actual).toEqual(expected);
// });
