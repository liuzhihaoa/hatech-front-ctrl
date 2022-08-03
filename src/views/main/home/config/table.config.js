export default function () {
    const table = {}
    table.data = []
    table.config = {
        table: {
            border: true
        },
        columns: [
            {
                label: '应用名称',
                prop: 'name'
            },
            {
                label: '所属分类',
                prop: 'type'
            },
            {
                label: '应用地址',
                prop: 'address'
            },
            {
                type: 'action',
                label: '操作',
                prop: 'action',
                props: {
                    options: [
                        { label: '测试' }
                    ]
                }
            }
        ]
    }
    return table
}