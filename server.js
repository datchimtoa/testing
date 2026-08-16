const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Cho phép Mini App truy cập từ mọi nơi
app.use(cors());

// Cấu hình để đọc IP chính xác khi chạy sau Cloudflare hoặc Proxy
app.set('trust proxy', true);

app.get('/get-ip', (req, res) => {
    // Lấy IP từ Cloudflare, Proxy hoặc kết nối trực tiếp
    let userIp = req.headers['cf-connecting-ip'] || 
                 req.headers['x-forwarded-for'] || 
                 req.socket.remoteAddress;

    // Xử lý định dạng nếu là IPv4 chuẩn IPv6 (::ffff:)
    if (userIp.startsWith('::ffff:')) {
        userIp = userIp.split('::ffff:')[1];
    }

    res.json({
        success: true,
        ip: userIp,
        type: userIp.includes(':') ? 'IPv6' : 'IPv4'
    });
});

app.listen(PORT, () => {
    console.log(`Máy chủ đang chạy tại cổng ${PORT}`);
});

