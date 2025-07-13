const footerRuntime = () => {
    // 1. 获取博客起始时间
    const startDate = new Date(theme.footerStart);
    const now = new Date();
    
    // 2. 计算时间差（毫秒）
    const timeDiff = now.getTime() - startDate.getTime();
    
    // 3. 拆解为天/时/分/秒
    const totalDays = timeDiff / 86400000; // 86400000 = 24 * 60 * 60 * 1000
    const days = Math.floor(totalDays);
    const hours = Math.floor((totalDays - days) * 24);
    const minutes = Math.floor(((totalDays - days) * 24 - hours) * 60);
    const seconds = Math.floor(((((totalDays - days) * 24 - hours) * 60) - minutes) * 60);
    
    // 4. 更新DOM元素
    const updateElement = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    };
    
    updateElement("runtime_days", days);
    updateElement("runtime_hours", hours);
    updateElement("runtime_minutes", minutes);
    updateElement("runtime_seconds", seconds);
    
    // 5. 每秒刷新一次
    setTimeout(footerRuntime, 1000);
};

// 6. 页面加载完成后启动
window.addEventListener("DOMContentLoaded", footerRuntime);