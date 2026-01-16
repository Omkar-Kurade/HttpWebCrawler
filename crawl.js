import { JSDOM } from "jsdom";

export async function crawlPage(baseURL, currentURL, pages) {

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages
    }
    pages[normalizedCurrentURL] = 1
    console.log(`actively crawling : ${currentURL}`)

    try {
        const resp = await fetch(currentURL)
        if (resp.status > 399) {
            console.log(`Error in fetch with status code : ${resp.status} on page : ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`non html responce , content type ${contentType},  on page : ${currentURL}`)
            return pages
        }
         const htmlBody = await resp.text()
         
         const nextURLs = getURLsFromHTML(htmlBody , baseURL)

         for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL , nextURL , pages

            )
         }
    } catch (error) {
        console.log(`Error in fetch : ${error.message} , on page ${currentURL}`)
    }

    return pages

}

export function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const anchorElements = dom.window.document.querySelectorAll("a");
    for (const anchor of anchorElements) {
        if (anchor.href.slice(0, 1) === "/") {
            //relative
            try {
                const urlObj = new URL(`${baseURL}${anchor.href}`);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(`Error with relative url ${error.message}`);
            }
        } else {
            //absolute
            try {
                const urlObj = new URL(anchor.href);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(`Error with absolute url ${error.message}`);
            }
        }
    }
    return urls;
}

export function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
        return hostPath.slice(0, -1);
    }

    return hostPath;
}
