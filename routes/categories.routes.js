const express = require('express'),
      router = express.Router(),
      CategoryService = require('../services/categories.service'),
      service = new CategoryService;

router.get('/', async (req, res) => {
  try {
    const categories = await service.find()
    res
      .status(200)
      .json({
        data: categories
      });
  } catch (error) {
    res
      .status(500)
      .json({
        error: {
          status: 500,
          title: "internal server error",
          details: "internal server error"
        }
      });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    if(!category) {
      return res
        .status(404)
        .json({
          error: {
            status: 404,
            title: "not found",
            details: "category not found"
          }
        });
    }
    return res
      .status(200)
      .json({
        data: category
      });
  } catch (error) {
    res
      .status(500)
      .json({
        error: {
          status: 500,
          title: "internal server error",
          details: "internal server error"
        }
      });
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req
    const newCategory = await service.create(body)
    res
      .status(201)
      .json({
        data: newCategory
      })
  } catch (error) {
    res
      .status(500)
      .json({
        error: {
          status: 500,
          title: "internal server error",
          details: "internal server error"
        }
      })
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const category = await service.update(id, body)
    res
      .status(200)
      .json({
        data: category
      })
  } catch (error) {
    res
      .status(404)
      .json({
        error: {
          status: 404,
          title: "not found",
          details: error.message
        }
      })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const category = await service.destroy(id)
    res
      .status(200)
      .json({
        id: category
      })
  } catch (error) {
    res
      .status(404)
      .json({
        error: {
          status: 404,
          title: "not fount",
          details: error.message
        }
      })
  }
});


module.exports = router;
