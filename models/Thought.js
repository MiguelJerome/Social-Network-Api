const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
      reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
        },
      reactionBody: {
        type: String, minlength: 1, maxlength: 280,
        required: true
      },
      username: {
          type: String,
          required: true
        },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

  const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String, minlength: 1, maxlength: 280,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
      },
      // use ReactionSchema to validate data for a reaction
      reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;