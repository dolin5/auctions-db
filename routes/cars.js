const router = require('express').Router();
const bodyParser = require('body-parser');

let Car = require('../models/cars.model');
const { update } = require('../models/cars.model');


router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({limit: '50mb'}));
router.use(bodyParser({limit: '50mb'}));

router.route('/').get((req, res) => {
  Car.find()
    .then(cars => res.json(cars))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const newCar = new Car(processKeys(req.body));
  newCar.save()
    .then(() => res.json('Car added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/exists').get(async(req,res)=>{
  const id = req.query.id;

  let result = await Car.findOne({id});
  res.send(result?true:false);
})

router.route('/ids').get(async(req,res)=>{
  let result = await Car.distinct('id');
  res.send(result);
})

router.route('/load-closed').post(async(req,res)=>{
  let input = req.query.auctions;
  let result = await Car.distinct('id');
  res.send(result);
})

router.route('/batch-upload').post(async(req,res)=>{
  let auctions = JSON.parse(req.body.input).auctions;
  Promise.all(auctions.map(auction => {
    let auctionInput = processKeys(auction);
    const newCar = new Car(auctionInput);
    return newCar.save();    
  })).then(() => res.json('All Cars added!'))
  .catch(err => res.status(400).json('Error: ' + err))
})

function processKeys(o){
  Object.keys(o).map(k=>{
    let updatedKey = k.replace(/([-_][a-z])/ig, ($1) => {
      return $1.toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
    o[updatedKey] = o[k];
    if (o[updatedKey] != null && typeof o[updatedKey] === 'object'){
      processKeys(o[updatedKey]);
    }
  })
  return o;
}

module.exports = router;