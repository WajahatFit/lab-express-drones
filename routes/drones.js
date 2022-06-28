const express = require('express');
const { connection } = require('mongoose');
const { deleteOne } = require('../models/Drone.model');
const router = express.Router();
const Drone = require('../models/Drone.model');
// require the Drone model here

router.get('/', async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const drones = await Drone.find({});
    res.render('drones/list', {drones:drones});
  } catch (error) {
    console.log(error)
    next(error)
  }
  
});

router.get('/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form');
});

router.post('/create', async(req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  const propellerInt= parseInt(propellers);
  const speedInt = parseInt(maxSpeed);
  try {
    
    const newDrone =  await Drone.create({name, propellers:propellerInt, speed:speedInt})
    res.redirect('/drones');
    console.log(newDrone);
  } catch (error) {
    console.log('Error while creating new Drone:', error)
  }
});

router.get('/:id/edit',async (req, res, next) => {
  // Iteration #4: Update the drone
  const {id} = req.params;
  // ... your code here
  try {
    const drone = await Drone.findById(id);
    res.render('drones/update-form', drone)
    console.log(drone)
  } catch (error) {
    console.log('updating drone error:', error);
    next(error);
  }
});

router.post('/:id/edit', async(req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const {id} = req.params;
  const {name, propellers, maxSpeed} = req.body;
  const propellerInt= parseInt(propellers);
  const speedInt = parseInt(maxSpeed);
  try {
  const updatedDrone = await Drone.findByIdAndUpdate(id,{name, propellers:propellerInt, maxSpeed:speedInt}, {new: true} );
  res.redirect(`/drones`);
  console.log(updatedDrone)
  } catch (error) {
    res.render('drones/update-form')
    console.log('Error updating drone', error)
    next(error);
  }
});


router.post('/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  try {
  const { id } = req.params;
  await Drone.findByIdAndDelete(id)
  res.redirect('/drones'); 
  } catch (error) {
    console.log('Error deleting Drone', error)
    next(error)
  }
});

module.exports = router;
