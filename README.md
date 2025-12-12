🐾 **Adota-Pet**

Plataforma de adoção de animais desenvolvida como MVP (Produto Mínimo Viável) para a disciplina de Interação Humano-Computador (IHC). O objetivo é conectar protetores de animais a pessoas interessadas em adotar, facilitando o processo com uma interface amigável, acessível e responsiva.

🔗 **Acesse o projeto online:** https://adota-pet-two.vercel.app/
* **Senha para Área do Protetor:** admin123
---

✨ **Funcionalidades**

🏠 **Para Adotantes (Público)**

- **Galeria Interativa:** Visualização de animais disponíveis com fotos e detalhes.
- **Filtros Inteligentes:** Filtragem rápida por tipo (Cão/Gato) e busca por nome/raça.
- **Status em Tempo Real:** Animais já adotados aparecem automaticamente no final da lista.
- **Ação Direta:** Botão "Quero Adotar" que redireciona para o WhatsApp do protetor (Redirecionamento Fake).

🛡️ **Para Protetores (Admin)**

- **Painel Administrativo:** Área protegida para gestão do abrigo.
- **Cadastro Simplificado:** Adição de novos animais com nome, idade, raça e descrição.
- **Gestão de Imagens:** Suporte híbrido para Upload de Arquivos (do computador) ou Links Externos (URLs).
- **Controle de Status:** Botão rápido para marcar um animal como "Adotado" ou "Disponível".

---

🛠 **Tecnologias Utilizadas**

O projeto foi construído utilizando uma arquitetura moderna e escalável:

- **Frontend:** React + Vite
- **Estilização:** Tailwind CSS
- **Backend & Banco de Dados:** Firebase Firestore (NoSQL)
- **Autenticação:** Firebase Auth (Login Anônimo e Gestão de Estado)
- **Ícones:** Lucide React

---

🚀 **Como executar o projeto localmente**

Siga os passos abaixo para rodar o Adota-Pet na sua máquina:

### 1. Pré-requisitos

Certifique-se de ter o Node.js instalado.

### 2. Clonar o repositório

```
git clone https://github.com/PietroDev-01/Adota_Pet.git
cd adota-pet
```

### 3. Instalar dependências

```
npm install
```

### 4. Configurar Variáveis de Ambiente

O projeto utiliza o Firebase e precisa das chaves de acesso.

Crie um arquivo chamado `.env` na raiz do projeto (ao lado do package.json).

Cole as chaves do seu projeto Firebase (encontradas no **Console do Firebase > Configurações do Projeto**):

```
VITE_API_KEY=sua_api_key_aqui
VITE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_PROJECT_ID=seu-projeto-id
VITE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_MESSAGING_SENDER_ID=123456789
VITE_APP_ID=1:123456789:web:abcdef
# Senha para acessar o Painel do Protetor
VITE_ADMIN_PASS=admin123
```

### 5. Rodar o servidor de desenvolvimento

```
npm run dev
```

O projeto estará disponível em **[http://localhost:5173](http://localhost:5173)**.

---

📂 **Estrutura do Projeto**

O código foi organizado seguindo uma adaptação do padrão MVC para React, visando manutenibilidade:

```
src/
├── components/      # (VIEW) Componentes visuais reutilizáveis (Cards, Navbar)
├── pages/           # (CONTROLLER) Telas principais e lógica de estado
├── services/        # (MODEL) Comunicação com Firebase e regras de negócio
├── assets/          # Imagens e recursos estáticos
└── App.jsx          # Configuração de rotas e inicialização
```

---

👥 **Equipe**

Desenvolvido com 💚 por:

<table>
<tr>
<td align="center">
<a href="https://github.com/PietroDev-01">
<img src="https://avatars.githubusercontent.com/PietroDev-01" width="100px;"/>
<br />
<sub><b>Álvaro Pietro</b></sub>
</a>
</td>

<td align="center">
<a href="https://github.com/hmccl">
<img src="https://avatars.githubusercontent.com/hmccl" width="100px;"/>
<br />
<sub><b>Hélio Mendes</b></sub>
</a>
</td>

<td align="center">
<a href="https://github.com/jpaullopes">
<img src="https://avatars.githubusercontent.com/jpaullopes" width="100px;"/>
<br />
<sub><b>João Paulo</b></sub>
</a>
</td>

<td align="center">
<a href="https://github.com/Luiz-06">
<img src="https://avatars.githubusercontent.com/Luiz-06" width="100px;"/>
<br />
<sub><b>Luiz Felipe</b></sub>
</a>
</td>

<td align="center">
<a href="https://github.com/thalyssonDEV">
<img src="https://avatars.githubusercontent.com/thalyssonDEV" width="100px;"/>
<br />
<sub><b>Thalysson Delano</b></sub>
</a>
</td>

</tr>
</table>
