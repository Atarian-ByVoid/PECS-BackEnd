import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PacienteModule } from './paciente/paciente.module';
import { PrismaService } from './prisma/prisma.service';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { RelatorioModule } from './relatorio/relatorio.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    AuthModule,
    PacienteModule,
    RelatorioModule,
  ],
  controllers: [AuthController, UsuarioController],
  providers: [AuthService, PrismaService, UsuarioService],
})
export class AppModule { }
