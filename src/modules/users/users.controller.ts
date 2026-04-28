import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard) // Protegemos todo el controlador
export class UsersController {
  
  @Get('admin-only')
  @Roles('admin') // Solo los usuarios con rol 'admin' acceden
  getAdminData() {
    return { message: 'Bienvenido administrador' };
  }
}
