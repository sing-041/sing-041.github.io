// ========================
// 模块导入区 (功能组件)
// ========================
import utils from "./utils.js";                          // 核心工具函数
import initTyped from "./plugins/typed.js";              // 打字机动画插件
import initLightDarkSwitch from "./tools/lightDarkSwitch.js"; // 深色/浅色模式切换
import initLazyload from "./layouts/lazyload.js";       // 图片懒加载
import initScrollControl from "./tools/scrollTopBottom.js"; // 滚动条控制
import initLocalSearch from "./tools/localSearch.js";    // 本地搜索功能
import initCodeBlock from "./tools/codeBlock.js";        // 代码块处理（含复制功能）
import initBookmarkNav from "./layouts/bookmarkNav.js";  // 书签导航

// ========================
// 主功能模块 (核心配置与逻辑)
// ========================
export const main = {
  // 主题元信息
  themeInfo: {
    theme: `Redefine v${theme.version}`,
    author: "EvanNotFound",
    repository: "https://github.com/EvanNotFound/hexo-theme-redefine"
  },
  
  // 本地存储键名
  localStorageKey: "REDEFINE-THEME-STATUS",
  
  // 样式状态管理
  styleStatus: {
    isExpandPageWidth: false,
    isDark: theme.colors.default_mode && theme.colors.default_mode === "dark",
    fontSizeLevel: 0,
    isOpenPageAside: true
  },

  // 打印主题LOGO与信息
  printThemeInfo: () => {
    console.log(`
      ______ __  __  ______  __    __  ______
     /\\__  _/\\ \\_\\ \\/\\  ___\\/\\ "-./  \\/\\  ___\\
     \\/_/\\ \\\\ \\  __ \\ \\  __\\\\ \\ \\-./\\ \\ \\  __\\
        \\ \\_\\\\ \\_\\ \\_\\ \\_____\\ \\_\\ \\ \\_\\ \\_____\\
         \\/_/ \\/_/\\/_/\\/_____/\\/_/  \\/_/\\/_____/
                                                               
 ______  ______  _____   ______  ______ __  __   __  ______
/\\  == \\/\\  ___\\/\\  __-./\\  ___\\/\\  ___/\\ \\/\\ "-.\\ \\/\\  ___\\
\\ \\  __<\\ \\  __\\\\ \\ \\/\\ \\ \\  __\\\\ \\  __\\ \\ \\ \\ \\-.  \\ \\  __\\
 \\ \\_\\ \\_\\ \\_____\\ \\____-\\ \\_____\\ \\_\\  \\ \\_\\ \\_\\\\"\\_\\ \\_____\\
  \\/_/ /_/\\/_____/\\/____/ \\/_____/\\/_/   \\/_/\\/_/ \\/_/\\/_____/
                                                               
  Github: https://github.com/EvanNotFound/hexo-theme-redefine`
    );
  },

  // 保存样式状态到本地存储
  setStyleStatus: () => {
    localStorage.setItem(main.localStorageKey, JSON.stringify(main.styleStatus));
  },

  // 从本地存储读取样式状态
  getStyleStatus: () => {
    const storedStatus = localStorage.getItem(main.localStorageKey);
    if (storedStatus) {
      const parsedStatus = JSON.parse(storedStatus);
      for (const key in main.styleStatus) {
        main.styleStatus[key] = parsedStatus[key];
      }
      return parsedStatus;
    }
    return null;
  },

  // 刷新所有动态功能
  refresh: () => {
    utils();                      // 初始化工具函数
    initLightDarkSwitch();         // 激活深色模式切换
    initScrollControl();          // 启用滚动控制
    initBookmarkNav();            // 初始化书签导航
    
    // 主页横幅打字机效果
    if (theme.home_banner.subtitle.text.length !== 0 && location.pathname === config.root) {
      initTyped("subtitle");
    }
    
    // 按需加载功能
    if (theme.navbar.search.enable) initLocalSearch();     // 本地搜索
    if (theme.articles.code_block.copy) initCodeBlock(); // 代码块复制按钮
    if (theme.articles.lazyload) initLazyload();          // 图片懒加载
  }
};

// ========================
// 初始化入口
// ========================
export function initMain() {
  main.printThemeInfo();  // 打印主题信息
  main.refresh();         // 启动核心功能
}

// 监听DOM加载完成事件
document.addEventListener("DOMContentLoaded", initMain);

// 兼容Swup页面切换框架（单页应用支持）
try {
  swup.hooks.on("page:view", () => {
    main.refresh();  // 页面切换后重新初始化动态组件
  });
} catch (error) {
  // 忽略Swup未定义的错误
}

//# sourceMappingURL=main.js.map