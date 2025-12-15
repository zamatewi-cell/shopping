// 全局 API 地址配置
const API_BASE_URL = "http://127.0.0.1:1024";

// 封装通用的错误处理
function handleError(err) {
    console.error(err);
    Swal.fire({
        icon: 'error',
        title: '哎呀...',
        text: '服务器开小差了，请检查网络或联系管理员！',
    });
}