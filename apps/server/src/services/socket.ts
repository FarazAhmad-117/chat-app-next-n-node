import { Server } from "socket.io";
import { Redis } from "ioredis";


const redisCreds = {
    host:'redis-14018.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
    port:14018,
    username:'default',
    password:'FFZU9keedMiEGLNrRf1BONIrRKakhFkL'
}


const pub = new Redis(redisCreds);
const sub = new Redis(redisCreds);

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
        sub.subscribe('MESSAGES')
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
                // Publish this message to redis;
                await pub.publish('MESSAGES',JSON.stringify({message}));
            })
        })
        
        sub.on('message',(channel,message)=>{
            if(channel === 'MESSAGES'){
                io.emit('message',JSON.parse(message).message);
            }
        })
    }
}


export default SocketService;
