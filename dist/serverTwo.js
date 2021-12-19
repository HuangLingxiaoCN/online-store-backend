"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const appTwo_1 = __importDefault(require("./appTwo"));
// import { MONGODB_URI } from './util/secrets'
const mongoUrl = 'mongodb://localhost:27017/product';
mongoose_1.default
    .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
    appTwo_1.default.listen(appTwo_1.default.get('port'), () => {
        console.log('  App is running at http://localhost:%d in %s mode', appTwo_1.default.get('port'), appTwo_1.default.get('env'));
        console.log('  Press CTRL-C to stop\n');
    });
})
    .catch((err) => err.message);
//# sourceMappingURL=serverTwo.js.map