import { Injectable, Inject } from '@nestjs/common';
import { error } from 'console';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository } from 'typeorm';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async cadastrar(data: UsuarioCadastrarDto):Promise<ResultadoDto>{
    let usuario = new Usuario();
    usuario.email = data.email;
    usuario.name = data.nome;
    usuario.password = data.senha;
    usuario.cpf = data.cpf;
    usuario.rg = data.rg
    return this.usuarioRepository.save(usuario)
    .then((result) => {
      return<ResultadoDto>{
        status:true,
        mensagem:"Usuário Cadastrado"
      }

    })
    .catch((error) =>{
      return<ResultadoDto>{
        status:false,
        mensagem:"Erro ao cadastrar"
      }
      
    })
   
  }

  async findOne(email: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.createQueryBuilder('usuario').where('email = :email', { email })
    .getOne();
  }
}

