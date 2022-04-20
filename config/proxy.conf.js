
const domain = 'localhost:8080';
const secure = false;
const valid_ssl = false;

const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/control",
            "/build",
            "/auth",
            "/styles",
            "/scripts",
            "/login",
            "/backoffice"
        ],
        target: `http${secure ? 's' : ''}://${domain}`,
        secure: valid_ssl,
        changeOrigin: true
    },
    {
        context: [
            "/control/websocket"
        ],
        target: `ws${secure ? 's' : ''}://${domain}`,
        secure: valid_ssl,
        changeOrigin: true,
        ws: true
    }
];

module.exports = PROXY_CONFIG;
