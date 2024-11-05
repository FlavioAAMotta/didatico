import "dotenv/config";

import { app } from "./app";
import { userRouter } from "./routes/userRouter";


app.use('/users', userRouter)
// app.use('/songs, songsRouter)
// app.use('/playlists, playlistsRouter)