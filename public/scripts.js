const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (const item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPages = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPages = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPages = currentPage >= selectedPage - 2

        if (firstAndLastPages || pagesBeforeSelectedPages && pagesAfterSelectedPages) {

            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages
}

function createPagination(pagination) {
    const pagination = document.querySelector(".pagination")
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ""

    for (let page of pages) {

        if (String(page).includes("...")) {
            elements += `<span id="pages">${page}</span>`
        } else {
            if (filter) {
                elements += `<a id="pages" href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a id="pages" href="?page=${page}">${page}</a>`
            }
        }

    }

    pagination.innerHTML = elements
}

if (pagination) {
    createPagination(pagination)
}