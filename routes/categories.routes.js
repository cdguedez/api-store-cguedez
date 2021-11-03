const express = require('express'),
      router = express.Router(),
      CategoryService = require('../services/categories.service'),
      service = new CategoryService;

router.get('/', (req, res) => {
  const categories = service.find()
  res
    .status(200)
    .json({
      data: categories
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.findOne(id)
  if(!category) {
    res
      .status(404)
      .json({
        error: {
          status: 404,
          title: "not found",
          details: "category not found"
        }
      })
  }
  res
    .status(200)
    .json({
      data: category
    })
});

router.post('/', (req, res) => {
  const { body } = req
  const newCategory = service.create(body)
  res
    .status(201)
    .json({
      data: newCategory
    })
});

router.patch('/:id', (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const category = service.update(id, body)
  res
    .status(200)
    .json({
      data: category
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const category = service.destroy(id)
  res
    .status(204)
    .json({
      id: category
    })
});


module.exports = router;
