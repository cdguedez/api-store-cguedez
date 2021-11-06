const express = require('express'),
      router = express.Router(),
      UsersService =require('../services/users.service'),
      service = new UsersService;

router.get('/', async (req, res) => {
  try {
    const users = await service.find();
    res
      .status(200)
      .json({
        data: users
      });
  } catch (error) {
    res
      .status(500)
      .json({
        error: {
          status: 500,
          title: 'Internal Server Error',
          details: error.message
        }
      })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await service.findOne(id)
    if(!user) {
      return res
        .status(404)
        .json({
          error: {
            status: 404,
            title: 'Not Found',
            details: `User with id ${id} not found`
          }
        })
    }
    res
      .status(200)
      .json({
        data: user
      });
  } catch (error) {
    res
      .status(500)
      .json({
        error: {
          status: 500,
          title: 'Internal Server Error',
          details: error.message
        }
      })
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newUser = await service.create(body)
    res
      .status(201)
      .json({
        data: newUser
      });
  } catch (error) {
    res
      .status(500)
      .json({
        error: {
          status: 500,
          title: 'Internal Server Error',
          details: error.message
        }
      })
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await service.update(id, body);
    res
      .status(200)
      .json({
        data: user
      })
  } catch (error) {
    res
      .status(404)
      .json({
        error: {
          status: 404,
          title: "User not found",
          details: error.message
        }
      })
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = service.destroy(id);
    res
      .status(200)
      .json({
        id: user
      });
  } catch (error) {
    res
      .status(404)
      .json({
        error: {
          status: 404,
          title: "not fount",
          details: error.message
        }
      });
  }
})

module.exports = router;
