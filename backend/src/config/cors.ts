import { CorsOptions } from 'cors'

export const corsConfig : CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            console.log('Permitir conexión')
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}