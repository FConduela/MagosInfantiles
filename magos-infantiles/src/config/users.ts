export interface User {
  username: string;
  password: string;
  role: 'admin' | 'editor';
  name: string;
}

export const users: User[] = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Administrador'
  },
  {
    username: 'editor1',
    password: 'editor123',
    role: 'editor',
    name: 'Editor Principal'
  },
  {
    username: 'editor2',
    password: 'editor456',
    role: 'editor',
    name: 'Editor Secundario'
  }
];

export const validateUser = (username: string, password: string): User | null => {
  console.log('Validando usuario:', { username, password });
  console.log('Usuarios disponibles:', users);
  
  const user = users.find(u => u.username === username && u.password === password);
  console.log('Usuario encontrado:', user);
  
  return user || null;
}; 