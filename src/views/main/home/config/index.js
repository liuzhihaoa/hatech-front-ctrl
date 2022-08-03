import Table from './table.config.js'

export default function () {
    const page = {}

    page.table = Table.call(this)

    return page
}