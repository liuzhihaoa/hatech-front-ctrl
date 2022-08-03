export default function () {
    const table = {}
    table.data = [
        {}
    ]
    table.config = {
        view: {
            options: [
                { label: '新增', icon: 'home', event: 'onInsertAction' }
            ]
        },
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
                label: '创建人',
                prop: 'createBy'
            },
            {
                type: 'action',
                label: '操作',
                prop: 'action',
                props: {
                    options: [
                        { label: '测试', event: 'onTestAction', type: 'warning' },
                        { label: '复制', event: 'onCopyAction' }
                    ]
                }
            }
        ]
    }
    return table
}