const express = require('express');
const { connection } = require('mongoose');
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

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form');
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
   
  Drone.create(req.body)
  .then (()=>{
    res.redirect('/drones');
  })
  .catch (error => console.log('Drone was"nt created try again!', error))
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
