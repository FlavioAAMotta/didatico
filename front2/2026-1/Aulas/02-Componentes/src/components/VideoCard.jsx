export function VideoCard(props) {
    let titulo = props.titulo;
    if(!props.titulo){
        titulo = "Vazio"
    }

    return (<div>
        <h4>{titulo}</h4>
        <img src={props.img} />
    </div>)
}