import { createAction } from 'redux-actions';
import SegmentService from '../../../../api-services/SegmentService';
import AnalyticsService from '../../../../api-services/AnalyticsService';

// list
export const SEGMENT_LIST_REQUEST = 'segment/list/request';
export const SEGMENT_LIST_SUCCESS = 'segment/list/success';
export const SEGMENT_LIST_ERROR = 'segment/list/error';

export const segmentListRequest = createAction(SEGMENT_LIST_REQUEST, () => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const segmentService = new SegmentService(appId, dispatch, getState());
    return segmentService.list({
      SUCCESS: SEGMENT_LIST_SUCCESS,
      ERROR: SEGMENT_LIST_ERROR
    });
  };
});

// update
export const SEGMENT_UPDATE_REQUEST = 'segment/update/request';
export const SEGMENT_UPDATE_SUCCESS = 'segment/update/success';
export const SEGMENT_UPDATE_ERROR = 'segment/update/error';

export const segmentUpdateRequest = createAction(SEGMENT_UPDATE_REQUEST, (id, data) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const segmentService = new SegmentService(appId, dispatch, getState());
    return segmentService.update(id, data, {
      SUCCESS: SEGMENT_UPDATE_SUCCESS,
      ERROR: SEGMENT_UPDATE_ERROR
    }, { successMessage: 'Segment saved' });
  };
});

// create
export const SEGMENT_CREATE_REQUEST = 'segment/create/request';
export const SEGMENT_CREATE_SUCCESS = 'segment/create/success';
export const SEGMENT_CREATE_ERROR = 'segment/create/error';

export const segmentCreateRequest = createAction(SEGMENT_CREATE_REQUEST, (data) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const segmentService = new SegmentService(appId, dispatch, getState());
    return segmentService.create(data, {
      SUCCESS: SEGMENT_CREATE_SUCCESS,
      ERROR: SEGMENT_CREATE_ERROR
    }, { successMessage: 'Segment created' });
  };
});

export const SEGMENT_SET_CURRENT = 'segment/set/current';
export const setCurrentSegment = createAction(SEGMENT_SET_CURRENT);

export const SEGMENT_SAVE = 'segment/save';
export const saveSegment = createAction(SEGMENT_SAVE, (id, data) => {
  return (dispatch) => {
    if (id === 'new') {
      dispatch(segmentCreateRequest(data));
    } else {
      dispatch(segmentUpdateRequest(id, data));
    }
  };
});

export const SEGMENT_PREVIEW_REQUEST = 'segment/preview/request';
export const SEGMENT_PREVIEW_SUCCESS = 'segment/preview/success';
export const SEGMENT_PREVIEW_ERROR = 'segment/preview/error';

let analyticService;

export const segmentPreviewRequest = createAction(SEGMENT_PREVIEW_REQUEST, (filter) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    if (analyticService && analyticService.req) {
      analyticService._abort();
    }

    analyticService = new AnalyticsService(appId, dispatch, getState());
    return analyticService.getAudienceCountByFilter({ filter }, {
      SUCCESS: SEGMENT_PREVIEW_SUCCESS,
      ERROR: SEGMENT_PREVIEW_ERROR
    });
  };
});

// filter management
export const SEGMENT_INIT_NEW = 'segment/init/new';
export const initNewSegment = createAction(SEGMENT_INIT_NEW);

export const SEGMENT_UPDATE_SELECTED_LOGICAL_OPERATOR = 'segment/logicalOperator/update';
export const updateSelectedLogicalOperator = createAction(SEGMENT_UPDATE_SELECTED_LOGICAL_OPERATOR, (filterGroupId, filterItemIndex, logicalOperator) => ({ filterGroupId, filterItemIndex, logicalOperator }));

export const SEGMENT_UPDATE_SELECTED_FILTER = 'segment/selected-filter/update';
export const updateSelectedFilter = createAction(SEGMENT_UPDATE_SELECTED_FILTER, (filterGroupId, filterItemIndex, filterName) => ({ filterGroupId, filterItemIndex, filterName }));

export const SEGMENT_UPDATE_SELECTED_OPERATOR = 'segment/selected-operator/update';
export const updateSelectedOperator = createAction(SEGMENT_UPDATE_SELECTED_OPERATOR, (filterGroupId, filterItemIndex, operator) => ({ filterGroupId, filterItemIndex, operator }));

export const SEGMENT_UPDATE_SELECTED_VALUE = 'segment/selected-value/update';
export const updateSelectedValue = createAction(SEGMENT_UPDATE_SELECTED_VALUE, (filterGroupId, filterItemIndex, value) => ({ filterGroupId, filterItemIndex, value }));

export const SEGMENT_ADD_FILTER_ITEM = 'segment/filter-type/add';
export const addFilteritem = createAction(SEGMENT_ADD_FILTER_ITEM); // filterGroupId

export const SEGMENT_REMOVE_FILTER_ITEM = 'segment/filter-type/remove';
export const removeFilteritem = createAction(SEGMENT_REMOVE_FILTER_ITEM, (filterGroupId, filterItemIndex) => ({ filterGroupId, filterItemIndex })); // filterGroupId

export const SEGMENT_UPDATE_NAME = 'segment/name/update';
export const updateName = createAction(SEGMENT_UPDATE_NAME); // name

export const TOGGLE_EXPAND_STATUS = 'segment/toggle/expand';
export const toggleExpand = createAction(TOGGLE_EXPAND_STATUS);

export const SEGMENT_SET_DISPLAY_LIST = 'segment/display-list/set';
export const setDisplayList = createAction(SEGMENT_SET_DISPLAY_LIST);

// list
export const SEGMENT_READ_REQUEST = 'segment/read/request';
export const SEGMENT_READ_SUCCESS = 'segment/read/success';
export const SEGMENT_READ_ERROR = 'segment/read/error';

export const segmentReadRequest = createAction(SEGMENT_READ_REQUEST, (segmentId) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const segmentService = new SegmentService(appId, dispatch, getState());
    return segmentService.read(segmentId, {
      SUCCESS: SEGMENT_READ_SUCCESS,
      ERROR: SEGMENT_READ_ERROR
    }).then((segment) => {
      dispatch(setCurrentSegment(segment));
    });
  };
});
//
// export const segmentReadSuccess = createAction(SEGMENT_READ_SUCCESS, (segment) => {
//   return (dispatch) => {
//     dispatch(setCurrentSegment(segment));
//   };
// });
