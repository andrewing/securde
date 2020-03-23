import mongoose from 'mongoose';

const {Schema} = mongoose;

const systemLogSchema = new Schema({
  time: String,
  action: String,
  content: String,
});

systemLogSchema.statics.addLog = (systemLog, callback) => {
  systemLog.save().then(callback);
};

systemLogSchema.statics.findAllLogs = async () => {
  return this.find();
};

const SystemLog = mongoose.model('systemlogs', systemLogSchema);

export default SystemLog;
