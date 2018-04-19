export default {
    "proxy": {
        "/": {
          "target": "http://localhost:8080/",
          "changeOrigin": true,
        }
      }
}
