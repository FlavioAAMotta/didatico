import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Vetor que simula uma tabela de usuários no banco de dados
const users = [
    { id: 1, name: 'Niltão', playlists: [1, 2] },
    { id: 2, name: 'Nicóla', playlists: [3] },
    { id: 3, name: 'Will I Am', playlists: [] }
];

// Vetor que simula uma tabela de playlists no banco de dados, com durações incluídas
const playlists = [
    { id: 1, name: 'Forróck', tracks: [{ trackName: 'Foguete não tem ré', duration: 180 }, { trackName: 'O golpe taí', duration: 200 }, { trackName: 'Forrock das aranhas', duration: 210 }] },
    { id: 2, name: 'Funkão dos cria', tracks: [{ trackName: 'Vida Louca', duration: 220 }, { trackName: 'Deu Onda', duration: 240 }, { trackName: 'Ela Só Quer Paz', duration: 250 }] },
    { id: 3, name: 'K-pop', tracks: [{ trackName: 'Dynamite', duration: 230 }, { trackName: 'Lovesick Girls', duration: 210 }, { trackName: 'Gee', duration: 190 }] }
];

// Implemente um endpoint que permita aos usuários adicionar uma faixa musical a uma playlist específica.
// O corpo da requisição deve conter os campos trackName e duration.
// Usuário Inexistente: 404 e a mensagem "User not found".
// Playlist Inexistente: 404 e a mensagem "Playlist not found".
// Campos Faltantes: 400 e a mensagem "Bad Request".
// Duração Inválida: Se duration não for um número válido, status 422 e a mensagem "Unprocessable Entity, invalid duration".
// Faixa Existente: Se a faixa já existir na playlist, status 409 e a mensagem "Conflict, track already exists".
// Sucesso: Se a faixa for adicionada com sucesso, o servidor deve responder com status 201 e a mensagem "Track added successfully".

app.post('/user/:userId/playlist/:playlistId', (req: Request, res: Response) => {
    // Params id do usuario, id da playlist
    // Headers token
    // Body id da musica
    try {
        let token = req.headers.authorization;
        let { userId, playlistId } = req.params;
        let musicId = req.body.musicId;

        if (!token || !userId || !playlistId || !musicId) {
            res.status(400);
            throw new Error("Bad Request");
        }

        let user = null;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == parseInt(userId)) {
                user = users[i];
            }
        }
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        res.send("Falta fazer o resto");
    } catch (error: any) {
        res.send(error.message);
    }
})

// app.get('/test/print/hello', (req: Request, res: Response) => {
//     res.send(`Olá, mundo!`)
// })

// app.get('/test/number/:number', (req: Request, res: Response) => {
//     if (isNaN(Number(req.params.number))) {
//         res.send('O valor inserido não é um número')
//     } else {
//         res.send(
//             `Seu número da sorte é ${Number(req.params.number) + 3}!
//     `)
//     }
// })


// Endpoint para adicionar uma faixa a uma playlist específica sem métodos prontos de vetores
// app.post('/users/:userId/playlists/:playlistId/tracks', (req: Request, res: Response) => {
//     const { userId, playlistId } = req.params;
//     const { trackName, duration } = req.body;

//     // Verificar se todos os campos estão presentes
//     if (!trackName || duration === undefined) {
//         return res.status(400).send("Bad Request");
//     }

//     // Verificar se duration é um número válido
//     if (isNaN(duration) || duration <= 0) {
//         return res.status(422).send("Unprocessable Entity, invalid duration");
//     }

//     // Procurar o usuário manualmente usando for
//     let user = null;
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].id === parseInt(userId)) {
//             user = users[i];
//             break;
//         }
//     }

//     if (!user) {
//         return res.status(404).send("User not found");
//     }

//     // Procurar a playlist manualmente usando for
//     let playlist = null;
//     for (let i = 0; i < playlists.length; i++) {
//         if (playlists[i].id === parseInt(playlistId)) {
//             playlist = playlists[i];
//             break;
//         }
//     }

//     if (!playlist) {
//         return res.status(404).send("Playlist not found");
//     }

//     // Verificar se a faixa já existe na playlist usando for
//     for (let i = 0; i < playlist.tracks.length; i++) {
//         if (playlist.tracks[i].trackName === trackName) {
//             return res.status(409).send("Conflict, track already exists");
//         }
//     }

//     // Adicionar a nova faixa à playlist manualmente usando for
//     playlist.tracks[playlist.tracks.length] = { trackName, duration: parseInt(duration) };

//     return res.status(201).send("Track added successfully");
// });


// // Endpoint para adicionar uma faixa a uma playlist específica
// app.post('/users/:userId/playlists/:playlistId/tracks', (req, res) => {
//     const { userId, playlistId } = req.params;
//     const { trackName, duration } = req.body;

//     // Verificar se todos os campos estão presentes
//     if (!trackName || duration === undefined) {
//         return res.status(400).send("Bad Request");
//     }

//     // Verificar se duration é um número válido
//     if (isNaN(duration) || duration <= 0) {
//         return res.status(422).send("Unprocessable Entity, invalid duration");
//     }

//     // Procurar o usuário
//     const user = users.find(u => u.id === parseInt(userId));
//     if (!user) {
//         return res.status(404).send("User not found");
//     }

//     // Procurar a playlist dentro do vetor playlists
//     const playlist = playlists.find(p => p.id === parseInt(playlistId));
//     if (!playlist) {
//         return res.status(404).send("Playlist not found");
//     }

//     // Verificar se a faixa já existe na playlist
//     const trackExists = playlist.tracks.find(t => t.trackName === trackName);
//     if (trackExists) {
//         return res.status(409).send("Conflict, track already exists");
//     }

//     // Adicionar a nova faixa à playlist
//     playlist.tracks.push({ trackName, duration: parseInt(duration) });

//     return res.status(201).send("Track added successfully");
// });

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
