import { Server } from "socket.io";

class SocketService{
    private _io:Server;

    constructor(){
        console.log('Init Socket Service...');
        this._io = new Server({
            cors:{
                allowedHeaders:['*'],
                origin:"*"
            }
        });
    }

    get io(){
        return this._io;
    }

    public initListeners(){
        const io = this._io;
        console.log(`Init Socket Listeners...`);
        io.on('connect',(socket)=>{
            console.log(`Socket Connected: ${socket.id} `);
            
            socket.on('event:message',async({message}:{message:string})=>{
                console.log(`New Message Recieved : ${message}`);
            })
        })
    }
}


export default SocketService;
