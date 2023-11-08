import { theme } from 'antd'


const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme
const themeConfig: any = {
    "light": {
        "token": {
            "colorBgBase": "#F0F0F5",
            "colorTextBase": "#1a1313"
        },
        "algorithm": [
            defaultAlgorithm
        ]
    },
    "dark": {
        "token": {
            "colorBgContainer": "#181717",
            "colorTextBase": "#E2E0E0"
        },
        "algorithm": [
            darkAlgorithm
        ]
    }
}

export default themeConfig