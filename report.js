export function printReport(pages) {
    console.log("=================")
    console.log("Report")
    console.log("=================")

    const sortedpPages = sortPages(pages)
    for (const sortedpPage of sortedpPages) {
        const url = sortedpPage[0]
        const hits = sortedpPage[1]
        console.log(`Found ${hits} Links to page : ${url} `)
    }

    console.log("=================")
    console.log("End Report")
    console.log("=================")

}

export function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => {
        let aHits = a[1]
        let bHits = b[1]
        return b[1] - a[1]
    })
    return pagesArr
}   