export default function () {
    const tree = {}
    tree.data = [
        {
            id: '1',
            label: '通用类',
        },
        {
            id: '2',
            label: '告警类'
        },
        {
            id: '3',
            label: '监控类'
        },
        {
            id: '4',
            label: '资源类'
        },
    ]
    tree.config = {
        view: {
            title: '应用分类',
            options: [
                { icon: 'home', label: '新增' }
            ]
        }
    }

    return tree
}