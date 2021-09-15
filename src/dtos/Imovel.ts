export type FotosDTO = {
  nome: string;
  url: string;
}

export interface Imoveis {
  id: string;
  area?: string;
  cidade?: string;
  codigo: number;
  created_at: Date;
  fotos: Array<FotosDTO>;
  moeda: number;
  uf?: string;
  obs?: string
  preco: number;
  publicar: boolean;
  tipo: string;
}