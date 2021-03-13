import Taro, { onError } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';

import './index.scss';
import close from './icon_close.png';
import { useEffect, useState } from 'react';

interface IAuthModalProps {
  onClose?: () => void; // 关闭事件
  onSuccess?: (userInfo) => void; // 授权成功事件
  onError?: (error) => void; // 失败回调
  title?: string; // 弹窗标题
  description?: string; // 弹窗副标题
  image?: string;
  btnText?: string;
  needSave?: boolean;
  visible?: boolean;
  btnColor?: string;
  btnTextColor?: string;
}

function AuthModal(props: IAuthModalProps) {
  const { 
    onClose,
    onSuccess,
    title,
    description,
    btnText,
    image,
    needSave = false,
    visible = false,
    btnColor = '#2F54EB',
    btnTextColor = '#FFFFFF'
  } = props;
  const [_visible, setVisible] = useState(visible);

  useEffect(() => {
    setVisible(props.visible || false);
  }, [props.visible])

  // 防止滚动穿透
  const handleTouchMove = (e: any) => {s
    e.preventDefault();
    e.stopPropagation();
  };

  const bindGetUserInfo = async e => {
    try {
      const userInfo = e?.detail?.userInfo || {};
      if (needSave) {
        Taro.setStorage({ key: 'userInfo', data: userInfo });
      }
      onClose && onClose();
      onSuccess && onSuccess(userInfo);
    } catch (error) {
      onError && onError(error);
    }
  };

  const _onModalClose = () => {
    setVisible(false);
    onClose && onClose();
  }

  return _visible ? (
    <View className="auth_modal" onTouchMove={handleTouchMove} catchMove>
      <View className="modal_container">
        <View className="modal_title-container">
          <View className="modal_title">{title}</View>
          <View className="modal_desc">{description}</View>
        </View>
        {image && <Image className="auth_image" mode="widthFix" src={image} />}
        <Button 
          hoverClass="auth_btn_hover"
          className="auth_btn"
          openType="getUserInfo"
          onGetUserInfo={bindGetUserInfo}
          style={{background: btnColor, color: btnTextColor}}>
          {btnText || '授权登录'}
        </Button>
        <View className="modal_close" onClick={_onModalClose}>
          <Image className="close_icon" src={close} />
        </View>
      </View>
      <View className="modal_mask" />
    </View>
  ) : null;
}

export default AuthModal;
