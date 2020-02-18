const adapter = window.__globalAdapter;
const env = wx.getSystemInfoSync();
let adaptSysFunc = adapter.adaptSys;

Object.assign(adapter, {
    // Extend adaptSys interface
    adaptSys (sys) {
        adaptSysFunc.call(this, sys);
        // TODO: add mac platform
        if (env.platform !== 'windows') {
            sys.isMobile = false;
            sys.os = sys.OS_WINDOWS;
        }
        // wechatgame subdomain
        if (!wx.getOpenDataContext) {
            sys.platform = sys.WECHAT_GAME_SUB;
          sys.browserType = sys.BROWSER_TYPE_WECHAT_GAME_SUB;
        }
        else {
          sys.platform = sys.WECHAT_GAME;
          sys.browserType = sys.BROWSER_TYPE_WECHAT_GAME;
        }

        sys.glExtension = function (name) {
            if (name === 'OES_texture_float') {
                return false;
            }
            return !!cc.renderer.device.ext(name);
        };
    },
});