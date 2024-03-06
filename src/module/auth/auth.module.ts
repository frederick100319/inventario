import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module'; // Importa UsuarioModule
import { JwtService } from '@nestjs/jwt'; // Asegúrate de importar JwtService

@Module({
    imports: [
        UsuarioModule, // Importa UsuarioModule aquí
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: '74953f9ce7b3173f13bcf65d713506a485fc6fc1f837d3b0abd52905d7c6d079',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [JwtStrategy, AuthService],
    exports: [JwtStrategy, PassportModule, AuthService],
    controllers: [AuthController], 
})
export class AuthModule {}
