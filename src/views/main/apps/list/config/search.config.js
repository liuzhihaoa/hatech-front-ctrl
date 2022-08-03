export default function () {
    const search = {}
    search.data = {}
    search.config = {
        form: {
            inline: true,
        },
        columns: [
            {
                show: true,
                type: 'input',
                label: '应用名称',
                prop: 'name',
                col: {
                    lg: 6,
                    md: 8
                },
                props: {
                    placeholder: '请输入应用名称'
                }
            },
            {
                show: true,
                type: 'input',
                label: '应用地址',
                name: 'address',
                col: {
                    lg: 6,
                    md: 8
                },
                props: {
                    placeholder: '请输入应用地址'
                }
            },
        ]
    }
    return search
}