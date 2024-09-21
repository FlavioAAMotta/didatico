import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const CardPlaylist = styled.div`
    border: 1px solid purple;
    background-color: green;
    color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
`

class Playlists extends React.Component {
    state = {
        playlists: []
    }

    //Fazer um get das playlist usando o token do LS
    //Fazer uma renderização usando map para mostrar as playlists e descrições na tela
    //CSS pra deixar bunitin
    componentDidMount() {

        const token = localStorage.getItem('token')
        axios.get('https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist',
            {
                headers: {
                    Authorization: token
                }
            }
        ).then((response) => {
            this.setState({ playlists: response.data.playlists })
        }).catch((e) => {
            console.log(e)
        })
    }
    
    //Fazer dois campos para criação de playlist, onde tem nome e desc
    
    render() {
        console.log('Playlists: ', this.state.playlists)

        const renderedPlaylists = this.state.playlists.map((playlist) => {
            return (<CardPlaylist key={playlist._id}>
                <p>{playlist._name}</p>
                <p>{playlist._description}</p>
            </CardPlaylist>)
        })

        return (
            <>
                <h1>Playlists</h1>
                <div>
                    {renderedPlaylists}
                </div>
            </>
        )
    }
}

export default Playlists