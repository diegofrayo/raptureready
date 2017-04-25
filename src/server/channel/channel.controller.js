import express from 'express';
import Channel from './channel.model';
import {
	addViewListener,
	getChannelByIdListener,
	listChannelsListener,
	searchChannelsListener
} from './channel.service';

const router = express.Router();

router.get('/add-view', addViewListener);
router.get('/categories', listChannelsListener);
router.get('/get', getChannelByIdListener);
router.get('/search', searchChannelsListener);

export default router;