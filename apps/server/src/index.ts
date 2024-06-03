import http from 'http';
import { config } from 'dotenv';
import SocketService from './services/socket';

config();
async function init(){
    const socketService = new SocketService();
    const httpServer = http.createServer();
    const PORT = process.env.PORT || 8001;

    socketService.io.attach(httpServer);

    
    httpServer.listen(PORT,()=>{
        console.log(`Server running at Port : ${PORT}`);
    })

    socketService.initListeners();
}

init();
