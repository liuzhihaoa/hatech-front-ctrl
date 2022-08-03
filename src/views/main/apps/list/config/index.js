import Table from './table.config.js'
import Tree from './tree.config'
import Search from './search.config'
import Pagination from './pagination.config' 

export default function () {
    const page = {}

    page.table = Table.call(this)
    page.tree = Tree.call(this)
    page.search = Search.call(this)
    page.pagination = Pagination.call(this)

    return page
}