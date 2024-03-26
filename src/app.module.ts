import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './module/categoria/categoria.module'; 
import { ProductosModule } from './module/productos/productos.module';
import { ProveedorModule } from './module/proveedor/proveedor.module';
import { CiudadModule } from './module/ciudad/ciudad.module';
import { VentaModule } from './module/venta/venta.module';
import { ClienteModule } from './module/cliente/cliente.module';
import { PersonaModule } from './module/persona/persona.module';
import { UsuarioModule } from './module/usuario/usuario.module';
import { AuthModule } from './module/auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: "Fred.0412",
      database: 'inventario',
      autoLoadEntities: true,
      synchronize: false,
    }),
    CategoriasModule,
    ProductosModule,
    ProveedorModule,
    CiudadModule,
    VentaModule,
    ClienteModule,
    PersonaModule,
    UsuarioModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
