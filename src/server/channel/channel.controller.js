// npm libs
import express from 'express';

// js utils
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