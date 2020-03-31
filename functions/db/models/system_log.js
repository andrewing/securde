import mongoose from 'mongoose';
import to from '../../util/to';

const {Schema} = mongoose;

const systemLogSchema = new Schema({
  time: String,
  action: String,
  content: String,
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
});

systemLogSchema.statics.addLog = (systemLog, callback) => {
  return to(systemLog.save().then(callback));
};

systemLogSchema.statics.findAllLogs = async () => {
  return to(SystemLog.find().populate('account'));
};

systemLogSchema.statics.findLogsByAccount = async accountID => {
  return to(
    SystemLog.find({
      account: accountID,
    }).populate('account'),
  );
};

const SystemLog = mongoose.model('SystemLog', systemLogSchema, 'systemlogs');

export default SystemLog;
