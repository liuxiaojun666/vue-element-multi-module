import toRgb from '@comm/tools/colorRgb'

export default {
    // 主题背景颜色
    bgc (a) {
        return toRgb('#fff', a)
    },
    // 主题字体颜色
    fc (a) {
        return toRgb('#333', a)
    },
    // 主题字体颜色激活
    fc_active (a) {
        return toRgb('#31d3c9', a)
    },
    // 主题边框颜色
    bc (a) {
        return toRgb('#ccc', a)
    }
}
