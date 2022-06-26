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
  try {
    
    const { name, propellers, speed } = req.body;
    const newDrone =  await Drone.create({name, propellers, speed})
    if(newDrone){
      res.redirect('/drones')
    }

  } catch (error) {
    console.log('Error while creating new Drone:', error)
  }
});

router.get('/:id/edit',async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  try {
    const {id} = req.params;
    res.render('drones/update-form')
    const updateDrone = await Drone.findById(id);
    console.log(updateDrone)
  } catch (error) {
    console.log('updating drone error:', error);
    next(error);
  }
});

router.post('/:id/edit', async(req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  try {
  const {id} = req.body;
  const updatedDrone  = await Drone.findByIdAndUpdate(id);
  console.log(updatedDrone)
  } catch (error) {
    console.log('Error updating drone', error)
    next(error);
  }
});

router.post('/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  try {
  const { id } = req.query
  await Drone.findByIdAndDelete(id)
  res.redirect('/drones'); 
  } catch (error) {
    console.log('Error deleting Drone', error)
    next(error)
  }
});

module.exports = router;
