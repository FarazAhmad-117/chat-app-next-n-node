import { Server } from "socket.io";
import { Redis } from "ioredis";
import prismaClient from './prisma';

const redisCreds = {
    host:'redis-10540.c257.us-east-1-3.ec2.redns.redis-cloud.com',
    port:10540,
    username:'default',
    password:'TFEtSlSu1uIC5NBxrpuLPbBPYufcOQxw'
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
        
        sub.on('message',async(channel,message)=>{
            if(channel === 'MESSAGES'){
                const parsedMessage =await JSON.parse(message).message
                io.emit('message',parsedMessage);
                await prismaClient.message.create({
                    data:{
                        text:parsedMessage
                    }
                })
            }
        })
    }
}


export default SocketService;
