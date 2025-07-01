import * as bcrypt from 'bcrypt';

async function generateHashedPasswords() {
  const passwords = {
    admin: 'admin123',
    editor1: 'editor123',
    editor2: 'editor456'
  };

  for (const [username, password] of Object.entries(passwords)) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`${username}: ${hashedPassword}`);
  }
}

generateHashedPasswords().catch(console.error); 