# Fotos das quadras (opcional)

Coloque aqui os arquivos de foto de cada quadra (.jpg, .png, .webp) e importe-os em
`src/data/courts.js`. Exemplo:

```js
// no topo do arquivo src/data/courts.js
import arenaCentral from "../assets/courts/arena-central.jpg";

export const courts = [
  {
    id: 1,
    name: "Arena Central — Quadra 1",
    // ...
    image: arenaCentral, // <- troque null por isso
  },
  // ...
];
```

O Vite cuida de otimizar e servir o arquivo automaticamente — não precisa mexer em mais
nada. Se preferir usar uma foto hospedada na internet, basta colocar a URL como string
direto no campo `image` (sem precisar de arquivo aqui).
