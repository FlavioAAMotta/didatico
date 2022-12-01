const playlists = [
    {
        id: 1,
        name: 'Rock',
        owner: 'Flávio',
        tracks: [
            {
                id: 1,
                name: 'Highway to Hell',
                artist: 'AC/DC',
                album: 'Highway to Hell',
                duration: 200,
                url: 'https://www.youtube.com/watch?v=K4DyBUG242c'
            },
            {
                id: 2,
                name: 'Back in Black',
                artist: 'AC/DC',
                album: 'Back in Black',
                duration: 200,
                url: 'https://www.youtube.com/watch?v=pAgnJDJN4VA'
            }
        ]
    },
    {
        id: 2,
        name: 'K-Pop',
        owner: 'Jamil',
        tracks: [
            {
                id: 3,
                name: 'Ddu-Du Ddu-Du',
                artist: 'BLACKPINK',
                album: 'BLACKPINK',
                duration: 200,
                url: 'https://www.youtube.com/watch?v=APn5MYJRTcM'
            }
        ]
    },
    {
        id: 3,
        name: 'Forróck',
        owner: 'Fábio',
        tracks: [
            {
                id: 5,
                name: 'Trem Bala',
                artist: 'Aviões do Forró',
                album: 'Trem Bala',
                duration: 200,
                url: 'https://www.youtube.com/watch?v=Z9Y6XZQX8qU'
            },
            {
                id: 6,
                name: 'Camarote',
                artist: 'Aviões do Forró',
                album: 'Camarote',
                duration: 200,
                url: 'https://www.youtube.com/watch?v=Z9Y6XZQX8qU'
            }
        ]
    }
];

const checkUserHasCoolPlaylists = (user: User): boolean => {
    if (user.playlists.length === 0) {
        return false;
    }
    for (let playlist of user.playlists) {
        if (checkCoolPlaylist(playlist)) {
            return true;
        }
    }
};

const checkCoolPlaylist = (playlist: Playlist): boolean => {
    if (playlist.tracks.length === 0) {
        return false;
    }
    for (let track of playlist.tracks) {
        if (track.name.includes('Aviões do Forró')) {
            return true;
        }
    }
};