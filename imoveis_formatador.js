const fs = require("fs");
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const stream = fs.createReadStream('houses.csv');

stream.pipe(csvParser());

let conteudo =[];

stream.pipe(csvParser()).on('data', (data)=>{
  conteudo.push({
    id: conteudo.length + 1,
    city: data.city,
    area: Number(data.area),
    rooms: Number(data.rooms),
    bathroom: Number(data.bathroom),
    'parking spaces': Number(data['parking spaces']),
    floor: data.floor,
    animal: data.animal,
    furniture: data.furniture,
    hoa: Number(data.hoa*100),
    'rent amount': Number(data['rent amount']*100),
    'property tax': Number(data['property tax']*100),
    'fire insurance': Number(data['fire insurance']*100),
    total: Number(data['total']*100)
  });
  // city,area,rooms,bathroom,parking spaces,floor,animal,furniture,hoa,rent amount,property tax,fire insurance,total
});

stream.on('end', ()=>{
  const csvWriter = createCsvWriter({
    path: 'imoveis_formatados_saida.csv',
    header: [
        {id: 'id', title: 'id'},
        {id: 'city', title: 'cidade'},
        {id: 'rooms', title: 'quartos'},
        {id: 'bathroom', title: 'banheiros'},
        {id: 'parking spaces', title: 'vagas_de_garagem'},
        {id: 'floor', title: 'andares'},
        {id: 'animal', title: 'animais'},
        {id: 'furniture', title: 'mobiliado'},
        {id: 'hoa', title: 'hoa'},
        {id: 'rent amount', title: 'aluguel'},
        {id: 'property tax', title: 'taxas'},
        {id: 'fire insurance', title: 'seguro_contra_fogo'},
        {id: 'total', title: 'total'}
    ]
});

csvWriter.writeRecords(conteudo);
});
