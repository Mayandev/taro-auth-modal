import Taro, { onError } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import './index.scss';
import React, { useEffect, useState } from 'react';
function AuthModal(props) {
    const { onClose, onSuccess, title, description, btnText, image, needSave = false, visible = false, btnColor = '#2F54EB', btnTextColor = '#FFFFFF' } = props;
    const [_visible, setVisible] = useState(visible);
    useEffect(() => {
        setVisible(props.visible || false);
    }, [props.visible]);
    // 防止滚动穿透
    const handleTouchMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const bindGetUserInfo = async (e) => {
        var _a;
        try {
            const userInfo = ((_a = e === null || e === void 0 ? void 0 : e.detail) === null || _a === void 0 ? void 0 : _a.userInfo) || {};
            if (needSave) {
                Taro.setStorage({ key: 'userInfo', data: userInfo });
            }
            onClose && onClose();
            onSuccess && onSuccess(userInfo);
        }
        catch (error) {
            onError && onError(error);
        }
    };
    const _onModalClose = () => {
        setVisible(false);
        onClose && onClose();
    };
    return _visible ? (React.createElement(View, { className: "auth_modal", onTouchMove: handleTouchMove, catchMove: true },
        React.createElement(View, { className: "modal_container" },
            React.createElement(View, { className: "modal_title-container" },
                React.createElement(View, { className: "modal_title" }, title),
                React.createElement(View, { className: "modal_desc" }, description)),
            image && React.createElement(Image, { className: "auth_image", mode: "widthFix", src: image }),
            React.createElement(Button, { hoverClass: "auth_btn_hover", className: "auth_btn", openType: "getUserInfo", onGetUserInfo: bindGetUserInfo, style: { background: btnColor, color: btnTextColor } }, btnText || '授权登录'),
            React.createElement(View, { className: "modal_close", onClick: _onModalClose },
                React.createElement("div", { className: "close_icon" }))),
        React.createElement(View, { className: "modal_mask" }))) : null;
}
export default AuthModal;
//# sourceMappingURL=index.js.map