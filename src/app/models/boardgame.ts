export interface BoardgameListItem{
    id: number;
    nombre: string;
    precio: number;
    estado: 'Vendido' | 'Reservado' | 'En venta';
}

export interface BoardgameViewItem extends BoardgameListItem{
    media: MediaData[];
    descripcion: string;
    editorial: string;
}

export interface MediaData{
    type: string;
    url: string;
}