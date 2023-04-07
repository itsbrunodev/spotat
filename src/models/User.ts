import { Model, Schema, model, models } from "mongoose";

import { IUserSchema } from "@/types";

const UserSchema = new Schema<IUserSchema>({
  _id: { type: String, required: true },
  lastUpdated: { type: Number, default: 0 },
  artists: {
    short_term: { type: Array, default: [] },
    medium_term: { type: Array, default: [] },
    long_term: { type: Array, default: [] },
  },
  tracks: {
    short_term: { type: Array, default: [] },
    medium_term: { type: Array, default: [] },
    long_term: { type: Array, default: [] },
  },
});

export default (models.User || model("User", UserSchema)) as Model<IUserSchema>;
