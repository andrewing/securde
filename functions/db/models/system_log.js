import mongoose from 'mongoose';
import to from '../../util/to';

const {Schema} = mongoose;

const systemLogSchema = new Schema({
  time: String,
  action: String,
  content: String,
});

systemLogSchema.statics.addLog = (systemLog, callback) => {
  return to(systemLog.save().then(callback));
};

systemLogSchema.statics.findAllLogs = () => {
  return to(SystemLog.find());
};

const SystemLog = mongoose.model('SystemLog', systemLogSchema, 'systemlogs');

export default SystemLog;
