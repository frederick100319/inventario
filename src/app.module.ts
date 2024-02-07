import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './module/categoria/categoria.module'; 
import { ProductosModule } from './module/productos/productos.module';
import { ProveedorModule } from './module/proveedor/proveedor.module';
import { CiudadModule } from './module/ciudad/ciudad.module';

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
    CiudadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}