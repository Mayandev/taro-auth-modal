import { Component } from 'react';
import { View, Button } from '@tarojs/components';
import './index.scss';
import AuthModal from '../../component';
import rocket from '../../assets/illustration_login.png';
export default class Index extends Component {
  state = {
    showModal: false,
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  showModal = () => {
    this.state.showModal = !this.state.showModal;
    this.setState({
      showModal: true,
    });
  };

  onClose = () => {
    this.setState({
      showModal: false,
    });
  };

  onSuccess = data => {
    console.log(data);
  };

  render() {
    return (
      <View className="index">
        <Button onClick={this.showModal}>Hello world!</Button>
        <AuthModal
          image={rocket}
          onClose={this.onClose}
          visible={this.state.showModal}
          onSuccess={this.onSuccess}
          title={'您未授权'}
          description={'请先授权登录进行操作'}
        />
      </View>
    );
  }
}
