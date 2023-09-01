export interface BoardgameListItem{
    id: number;
    nombre: string;
    editorial: string;
    estado: 'Vendido' | 'Reservado' | 'En venta';
}

export interface BoardgameViewItem extends BoardgameListItem{
    media: MediaData[];
    descripcion: string;
    precio: number;
}

export interface MediaData{
    type: "image" | "video";
    url: string;
}