const path = require('path')

module.exports = {
    devServer: {
        port:10014,
        host:"192.168.1.5",
        https: true
    },
    configureWebpack:{
        resolve:{
            alias:{
                "@src":path.resolve(__dirname,'src'),
                "@components":path.resolve(__dirname,'src/components'),
                "@views":path.resolve(__dirname,'src/views'),
                "@assets":path.resolve(__dirname,'src/assets'),
                "@utils":path.resolve(__dirname,'src/utils'),
            }
        }
    }
}