import Channel from './channel.model';

function getChannelById(id) {
	return Channel.findOne({
		_id: id
	}).populate('categories');
}

function listChannels() {
	return Channel.find({}).sort({
		_id: -1
	}).populate('categories');
}

function searchChannels(query) {

	var orQuery = [];

	if (query) {

		query.split(' ').map((el) => {
			orQuery.push({
				title: new RegExp(el, 'i')
			});
			orQuery.push({
				description: new RegExp(el, 'i')
			});
			orQuery.push({
				slug: new RegExp(el, 'i')
			});
		});

	} else {

		return Channel.find({}).sort({
			_id: -1
		}).populate('categories');

	}

	return Channel.find({
		$query: {
			$or: orQuery
		}
	});
}

function getChannelsByCategory(channels) {

	var categories = {};

	channels.forEach(function(channel) {

		var channelCopy = JSON.parse(JSON.stringify(channel));

		if (channelCopy.categories) {
			delete channelCopy.categories
		}

		channel.categories.forEach(function(category) {

			if (!categories[category._id]) {
				categories[category._id] = {
					_id: category._id,
					name: category.name,
					channels: []
				};
			}

			if (!categories[category._id].channels) {
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

export function listChannelsListener(req, res) {

	listChannels()
		.then(response => res.json({
			success: true,
			categories: getChannelsByCategory(response)
		}))
		.catch((error) => {
			res.json({
				success: false,
				message: error.message
			})
		});
}

export function getChannelByIdListener(req, res) {

	getChannelById(req.query.id)
		.then(response => res.json({
			success: true,
			channel: response
		}))
		.catch((error) => {
			res.json({
				success: false,
				message: error.message
			})
		});
}

export function searchChannelsListener(req, res) {

	searchChannels(req.query.query)
		.then(response => res.json({
			success: true,
			channels: response
		}))
		.catch((error) => {
			res.json({
				success: false,
				message: error.message
			})
		});
}

export function addViewListener(req, res) {

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
			res.json({
				success: false,
				message: error.message
			})
		});
}