import email from "../infra/email.js";

async function sendEmailToUser(user) {
  await email.send({
    from: "FinTab <contato@fintab.com.br",
    to: user.email,
    subject: "Ative seu cadastro no FinTab!",
    text: `${user.username}, clique no link abaixo para ativar seu cadastro:
    
http://localhost:3000/activate?token=EXEMPLO_DE_TOKEN


Atenciosamente,
Equipe FinTab`,
  });
}

const activation = {
  sendEmailToUser,
};

export default activation;
