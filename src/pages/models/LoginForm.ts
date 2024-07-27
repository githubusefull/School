import mongoose, { Document, Model, Schema } from 'mongoose';

interface ILoginForm extends Document {
  email: string;
  password: string;
}

const LoginFormSchema: Schema<ILoginForm> = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginForm: Model<ILoginForm> = mongoose.models.LoginForm || mongoose.model<ILoginForm>('LoginForm', LoginFormSchema);
export default LoginForm;
