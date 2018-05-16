import BindingInput from './components/BindingInput'
import { connect } from 'dva'
import { Result, Icon, Flex } from 'antd-mobile'

function bindingPage({ success }) {
    let content;
    if (success) {
        content = <Result
            img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
            title="验证成功"
            message="所提交内容已成功完成验证"
        />;
    } else {
        content = <BindingInput />;
    }
    return (
        <Flex align='center' style={{ marginTop: '100px' }}>
            <Flex.Item>{content}</Flex.Item>
        </ Flex>
    );
}
function mapStateToProps(state) {
    const { success } = state.binding;
    return {
        success
    }
}

export default connect(mapStateToProps)(bindingPage);