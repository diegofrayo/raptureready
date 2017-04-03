import express from 'express';
import Channel from './channel.model';

const router = express.Router();

function getChannel(id) {
  return Channel.findOne({_id: id}).populate('categories');
}

function listChannels() {
  return Channel.find({}).sort({_id: -1}).populate('categories');
}

function searchChannels(query) {
  var orQuery = [];
  if (query) {
    query.split(' ').map((el) => {
      orQuery.push({"title": new RegExp(el, 'i') });
      orQuery.push({"description": new RegExp(el, 'i') });
      orQuery.push({"slug": new RegExp(el, 'i') });
    })
  } else {
    return Channel.find({}).sort({_id: -1}).populate('categories');
  }

  return Channel.find({$query: {$or: orQuery}});
}

function byCategories(channels) {
  var categories = {};


  channels.forEach(function(channel) {
    var channelCopy = JSON.parse(JSON.stringify(channel));
    if (channelCopy.categories) {
      delete channelCopy.categories
    }

    channel.categories.forEach(function (category) {

      if (!categories[category._id]) {
        categories[category._id] = {
          _id: category._id,
          name: category.name,
          channels: []
        };
      }

      if(!categories[category._id].channels) {
        categories[category._id].channels = [];
      }

      categories[category._id].channels.push(channelCopy);
    });

  });

  const response = [];
  for (var id in categories) {
    response.push(categories[id]);
  }

  response.sort((a, b) => a.name > b.name);

  return response;
}

router.get('/categories', function (req, res) {

  listChannels()
    .then(response => res.json({
      success: true,
      categories: byCategories(response)
    }))
    .catch((error) => {
      res.json({success: false, message: error.message})
    });
});

router.get('/get', function (req, res) {

  getChannel(req.query.id)
    .then(response => res.json({
      success: true,
      channel: response
    }))
    .catch((error) => {
      res.json({success: false, message: error.message})
    });
});

router.get('/search', function (req, res) {

  searchChannels(req.query.query)
    .then(response => res.json({
      success: true,
      channels: response
    }))
    .catch((error) => {
      res.json({success: false, message: error.message})
    });
});

router.get('/add-view', function (req, res) {

  Channel.findOneAndUpdate({
    _id: req.query.id,
  }, {
    $inc: {
      views: 1
    }
  })
    .then(response => res.json({
      success: true
    }))
    .catch((error) => {
      res.json({success: false, message: error.message})
    });
});


export default router;