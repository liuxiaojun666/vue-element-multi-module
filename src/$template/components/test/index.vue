<script>
// import {getThemeColors} from '@comm/assets/themes'
const outerMsg = '333333333'
export default {
    name: 'test',
    data () {
        return {
            modelName: '数据查询',
            msg: 'hello world',
            obj: {

            }
        }
    },
    render (h) {
        return (
            <div class="test">
                <div class="container">
                    <span class="text">{this.msg}</span>
                    <span>{outerMsg}</span>
                    <div class="linear"></div>
                </div>
            </div>
        )
    }
}
</script>

<style lang="scss" scoped>
.test {
    height: 50vh;
    padding: 30px;
    font-size: 20px;

    > .container {
        width: 100%;
        height: 100%;
        padding: 10px;
        // @include theme_bgc(.7);
        // @include bgi('~./img/', '/a.jpg');

        .text {
            cursor: pointer;
            @include c(color, $text_c0);
            // @include theme_fc(1);

            &:hover {
                // @include theme_fc_active(.7);
            }
        }

        .linear {
            width:1299px;
            height:492px;
            background: lighten(rgba(#124271, .2), 5%) linear-gradient(209deg,lighten(rgba(110,125,139,.2), 5%),lighten(rgba(100,140,183,.2),5%),lighten(rgba(255,0,114,.2),5%));
        }
    }
}
</style>
