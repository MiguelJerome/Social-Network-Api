const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  updateThought,
  deleteThought,
    addThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThought);
 
// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);
  
// /api/thoughts/<userId>
router.route('/:userId').post(addThought);
   
// /api/thoughts/<thoughtId>/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);


  // /api/thoughts/<thoughtId>/reactions/<reactionId>
  router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);



module.exports = router;