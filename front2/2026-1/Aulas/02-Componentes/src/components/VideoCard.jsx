export function VideoCard(props) {
    let titulo = props.titulo;
    if(!props.titulo){
        titulo = "Vazio"
    }

    return (<div>
        <h4 className="bg-red-500">{titulo}</h4>
        <img src={props.img} />
    </div>)
}