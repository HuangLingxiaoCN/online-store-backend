"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const host = process.env.MONGODB_URI;
mongoose_1.default
    .connect(host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
    app_1.default.listen(app_1.default.get('port'), () => {
        console.log('  App is running in %s mode', app_1.default.get('port'), app_1.default.get('env'));
        console.log('  Press CTRL-C to stop\n');
    });
})
    .catch((err) => err.message);
//# sourceMappingURL=server.js.map