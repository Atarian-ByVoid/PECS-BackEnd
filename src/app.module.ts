import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { PacienteModule } from './paciente/paciente.module';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),

    AuthModule,

    PacienteModule,

    DiagnosticoModule,

  ],
  controllers: [AuthController, UsuarioController],
  providers: [
    AuthService,
    PrismaService,
    UsuarioService

  ],
})
export class AppModule { }
